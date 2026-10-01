import { ShipmentStatus, UserRole, User, ServiceType } from "./api";
import { Shipment } from "./domain";

describe("Domain Type Narrowing Tests", () => {
  it("should enforce UserRole enum on User type", () => {
    const user: User = {
      id: "1",
      email: "test@example.com",
      name: "Test User",
      role: UserRole.CUSTOMER, // Expected to compile
      isActive: true,
      isAvailable: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(user.role).toBe("CUSTOMER");
  });

  it("should enforce ShipmentStatus enum on Shipment type", () => {
    const shipment: Shipment = {
      id: "1",
      trackingNumber: "CLG-20231012-00001",
      customerId: "user-1",
      status: ShipmentStatus.PENDING, // Expected to compile
      originAddress: "123 Origin St",
      originCity: "Origin City",
      originZoneId: "zone-1",
      destinationAddress: "456 Dest St",
      destinationCity: "Dest City",
      destinationZoneId: "zone-2",
      recipientName: "John Doe",
      recipientPhone: "555-1234",
      serviceType: ServiceType.STANDARD,
      estimatedPrice: "100.00",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(shipment.status).toBe("PENDING");
  });
});
