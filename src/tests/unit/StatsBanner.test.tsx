import { render, screen, waitFor } from "@testing-library/react";
import { StatsBanner } from "@/components/public/StatsBanner";

describe("StatsBanner Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does not render placeholder data like 4.2M, 120+, or 98%", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      new Promise(() => {}) // never resolves to test default state
    );

    render(<StatsBanner />);

    // Should NOT contain the old fake placeholder numbers
    expect(screen.queryByText("4.2M")).not.toBeInTheDocument();
    expect(screen.queryByText("120+")).not.toBeInTheDocument();
    expect(screen.queryByText("98%")).not.toBeInTheDocument();

    // Should render real zero state
    expect(screen.getByText("0%")).toBeInTheDocument();
    const zeros = screen.getAllByText("0");
    expect(zeros.length).toBeGreaterThanOrEqual(2); // countries & shipments handled
    expect(screen.getByText("24/7")).toBeInTheDocument();
  });

  it("renders live stats accurately when fetched from API", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          totalShipments: 8,
          deliveredShipments: 3,
          onTimeRate: 100,
          countries: 0,
          tracking: "24/7",
        },
      }),
    } as unknown as Response);

    render(<StatsBanner />);

    await waitFor(() => {
      expect(screen.getByText("100%")).toBeInTheDocument();
      expect(screen.getByText("8")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
      expect(screen.getByText("24/7")).toBeInTheDocument();
    });
  });
});
