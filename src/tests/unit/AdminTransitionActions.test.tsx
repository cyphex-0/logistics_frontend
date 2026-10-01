import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminTransitionActions } from "@/app/(protected)/(admin)/admin/shipments/[id]/components/AdminTransitionActions";
import { ShipmentStatus, PaymentStatus, ServiceType } from "@/types/api";
import { useUpdateShipmentStatus } from "@/hooks/queries";

jest.mock("@/hooks/queries", () => ({
  useUpdateShipmentStatus: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
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

describe("AdminTransitionActions", () => {
  const mockShipment = {
    id: "shp_123",
    trackingNumber: "TRK123",
    status: ShipmentStatus.PENDING,
    paymentStatus: PaymentStatus.PAID,
    originAddress: "123 Main St",
    destinationAddress: "456 Market St",
    serviceType: ServiceType.STANDARD,
    customerId: "cus_123",
    events: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  let mockMutate: jest.Mock;

  beforeEach(() => {
    mockMutate = jest.fn();
    (useUpdateShipmentStatus as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should open dialog when Force Status button is clicked", () => {
    render(<AdminTransitionActions shipment={mockShipment as any} />);
    
    expect(screen.queryByText("Admin Status Override")).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByRole("button", { name: /Force Status/i }));
    
    expect(screen.getByText("Admin Status Override")).toBeInTheDocument();
  });

  it("should disable submit if description is empty or status is unchanged", async () => {
    render(<AdminTransitionActions shipment={mockShipment as any} />);
    
    fireEvent.click(screen.getByRole("button", { name: /Force Status/i }));
    
    const submitBtn = screen.getByRole("button", { name: /Update Status/i });
    expect(submitBtn).toBeDisabled();

    // Select new status
    const select = screen.getByTestId("mock-select");
    const deliveredItem = screen.getByTestId("mock-select-item-DELIVERED");
    fireEvent.click(deliveredItem);

    // Still disabled because no description
    expect(submitBtn).toBeDisabled();

    // Add description
    const descInput = screen.getByPlaceholderText(/Admin updated status/i);
    await userEvent.type(descInput, "Delivered by admin");

    // Should now be enabled
    expect(submitBtn).not.toBeDisabled();
  });

  it("should call update mutation with correct payload", async () => {
    render(<AdminTransitionActions shipment={mockShipment as any} />);
    
    fireEvent.click(screen.getByRole("button", { name: /Force Status/i }));
    
    // Select FAILED_DELIVERY status to test failure reason
    const failedItem = screen.getByTestId("mock-select-item-FAILED_DELIVERY");
    fireEvent.click(failedItem);

    const descInput = screen.getByPlaceholderText(/Admin updated status/i);
    await userEvent.type(descInput, "Failed due to bad address");

    const reasonInput = screen.getByPlaceholderText(/Lost in transit/i);
    await userEvent.type(reasonInput, "Bad address");

    const submitBtn = screen.getByRole("button", { name: /Update Status/i });
    fireEvent.click(submitBtn);

    expect(mockMutate).toHaveBeenCalledWith(
      {
        id: "shp_123",
        status: ShipmentStatus.FAILED_DELIVERY,
        description: "Failed due to bad address",
        failureReason: "Bad address",
      },
      expect.any(Object)
    );
  });
});
