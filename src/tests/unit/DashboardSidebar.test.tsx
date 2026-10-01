import { render, screen } from "@testing-library/react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { useAuth } from "@/components/providers/AuthProvider";
import { usePathname } from "next/navigation";

jest.mock("@/components/providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("DashboardSidebar Role-based Navigation", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders customer links for CUSTOMER role", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: "CUSTOMER" },
    });

    render(<DashboardSidebar />);

    expect(screen.getByText("My Shipments")).toBeInTheDocument();
    expect(screen.getByText("Track Shipment")).toBeInTheDocument();
    
    // Admin and Courier links should not be present
    expect(screen.queryByText("Users & Drivers")).not.toBeInTheDocument();
    expect(screen.queryByText("Assigned Shipments")).not.toBeInTheDocument();
  });

  it("renders admin links for ADMIN role", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: "ADMIN" },
    });

    render(<DashboardSidebar />);

    expect(screen.getByText("Users & Drivers")).toBeInTheDocument();
    expect(screen.getByText("Zones")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
    
    // Customer and Courier specific links should not be present
    expect(screen.queryByText("Track Shipment")).not.toBeInTheDocument();
    expect(screen.queryByText("Assigned Shipments")).not.toBeInTheDocument();
  });

  it("renders courier links for COURIER role", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role: "COURIER" },
    });

    render(<DashboardSidebar />);

    expect(screen.getByText("Assigned Shipments")).toBeInTheDocument();
    
    // Admin and Customer specific links should not be present
    expect(screen.queryByText("Users & Drivers")).not.toBeInTheDocument();
    expect(screen.queryByText("Track Shipment")).not.toBeInTheDocument();
  });
});
