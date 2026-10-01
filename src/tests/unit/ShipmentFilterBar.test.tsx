import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ShipmentFilterBar } from "@/app/(protected)/(admin)/admin/shipments/components/ShipmentFilterBar";
import { useRouter, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock Radix Select components for easier testing without PointerEvents
jest.mock("@/components/ui/select", () => ({
  Select: ({ children, value, onValueChange }: { children: React.ReactNode, value?: string, onValueChange: (v: string) => void }) => (
    <div data-testid="mock-select" data-value={value} onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      const itemVal = (e.target as HTMLElement).getAttribute("data-value");
      if (itemVal) onValueChange(itemVal);
    }}>
      {children}
    </div>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <button>{children}</button>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
  SelectContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode, value: string }) => <div data-testid={`mock-select-item-${value}`} data-value={value}>{children}</div>,
}));

describe("ShipmentFilterBar URL Serialization", () => {
  let mockPush: jest.Mock;
  
  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update URL with search parameter and reset page when searching", async () => {
    // Setup initial search params (empty)
    const mockSearchParams = new URLSearchParams();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    render(<ShipmentFilterBar />);
    
    const searchInput = screen.getByPlaceholderText("Search by tracking number...");
    
    // Type in search box
    await userEvent.type(searchInput, "TRK123");
    
    // Check if router.push was called with debounced value
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("?q=TRK123&page=1");
    }, { timeout: 1000 });
  });

  it("should remove default ALL status from URL but reset page", async () => {
    // Start with a non-default status
    const mockSearchParams = new URLSearchParams("status=PENDING&page=2");
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    render(<ShipmentFilterBar />);
    
    const allItems = screen.getAllByTestId("mock-select-item-ALL");
    // Simulate changing to ALL (click the first one, which is desktop)
    fireEvent.click(allItems[0]);

    // Should remove status, but set page to 1
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("?page=1");
    });
  });

  it("should update sort param without resetting page", async () => {
    const mockSearchParams = new URLSearchParams("page=3");
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    render(<ShipmentFilterBar />);
    
    const oldestItems = screen.getAllByTestId("mock-select-item-oldest");
    // Simulate changing to oldest
    fireEvent.click(oldestItems[0]);

    // Should update sort, keep page as is
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("?page=3&sort=oldest");
    });
  });
});
