import { render, screen, waitFor, act } from "@testing-library/react";
import PaymentSuccessPage from "@/app/payment/success/page";
import { useShipment } from "@/lib/query/shipments";
import { PaymentStatus, ShipmentStatus } from "@/types/api";

jest.mock("@/lib/query/shipments", () => ({
  useShipment: jest.fn(),
}));

describe("PaymentSuccessPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should show payment confirmed if shipment is already PAID", () => {
    (useShipment as jest.Mock).mockReturnValue({
      data: {
        id: "shp_123",
        paymentStatus: PaymentStatus.PAID,
        status: ShipmentStatus.CONFIRMED,
      },
      refetch: jest.fn(),
    });

    render(<PaymentSuccessPage searchParams={{ shipmentId: "shp_123" }} />);

    expect(screen.getByText("Payment Confirmed!")).toBeInTheDocument();
  });

  it("should poll for status updates when shipment is PENDING", async () => {
    const mockRefetch = jest.fn()
      .mockResolvedValueOnce({ data: { paymentStatus: PaymentStatus.INITIATED, status: ShipmentStatus.PENDING } })
      .mockResolvedValueOnce({ data: { paymentStatus: PaymentStatus.PAID, status: ShipmentStatus.CONFIRMED } });

    (useShipment as jest.Mock).mockReturnValue({
      data: {
        id: "shp_123",
        paymentStatus: PaymentStatus.INITIATED,
        status: ShipmentStatus.PENDING,
      },
      refetch: mockRefetch,
    });

    render(<PaymentSuccessPage searchParams={{ shipmentId: "shp_123" }} />);

    expect(screen.getByText(/Please note: The payment is currently being confirmed asynchronously/)).toBeInTheDocument();
    expect(screen.getByText("Checking confirmation status...")).toBeInTheDocument();

    // Fast-forward time by 3 seconds for first poll
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Wait for refetch to resolve
    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    // Fast-forward time for second poll
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalledTimes(2);
    });
    
    // UI should update because now we have PAID state from the refetch...
    // Note: React Query's `useShipment` data value would normally update in a real app,
    // but in this mocked test, the component only looks at `shipment?.paymentStatus` for the UI.
    // The refetch result sets `isPolling` to false. We just test that polling stops.
    
    await waitFor(() => {
      expect(screen.queryByText("Checking confirmation status...")).not.toBeInTheDocument();
    });
  });

  it("should not poll if no shipmentId is provided", async () => {
    (useShipment as jest.Mock).mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
    });

    render(<PaymentSuccessPage searchParams={{}} />);

    // Since timeout happens with 0 delay
    act(() => {
      jest.advanceTimersByTime(10);
    });
    
    await waitFor(() => {
      expect(screen.queryByText("Checking confirmation status...")).not.toBeInTheDocument();
    });
  });
});
