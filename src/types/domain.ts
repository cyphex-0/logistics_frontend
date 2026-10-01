import {
  User,
  ServiceType,
  ShipmentStatus,
  PaymentMethod,
  PaymentStatus,
  DeliveryAttemptStatus,
} from "./api";

// ----------------------------------------------------------------------
// Core Domain Entities (Matching Prisma Schema Exactly)
// ----------------------------------------------------------------------

/**
 * Shipment Entity
 * Represents the core shipment record.
 */
export interface Shipment {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Guaranteed: Unique tracking number formatted as CLG-YYYYMMDD-XXXXX */
  trackingNumber: string;
  /** Guaranteed: ID of the customer who created the shipment */
  customerId: string;
  /** Conditional: Nullable until a courier is assigned */
  courierId?: string | null;
  /** Guaranteed: Current status of the shipment */
  status: ShipmentStatus;
  /** Guaranteed: Origin physical address */
  originAddress: string;
  /** Guaranteed: Origin city name */
  originCity: string;
  /** Guaranteed: ID of the origin delivery zone */
  originZoneId: string;
  /** Guaranteed: Destination physical address */
  destinationAddress: string;
  /** Guaranteed: Destination city name */
  destinationCity: string;
  /** Guaranteed: ID of the destination delivery zone */
  destinationZoneId: string;
  /** Guaranteed: Name of the recipient */
  recipientName: string;
  /** Guaranteed: Phone number of the recipient */
  recipientPhone: string;
  /** Guaranteed: Chosen service type (STANDARD, EXPRESS) */
  serviceType: ServiceType;
  /** Guaranteed: Initially computed estimated price, decimal as string */
  estimatedPrice: string;
  /** Conditional: Set only on payment confirmation, decimal as string */
  finalPrice?: string | null;
  /** Optional: Additional notes for the delivery */
  notes?: string | null;
  /** Conditional: Date and time when the shipment was picked up */
  pickedUpAt?: string | null;
  /** Conditional: Date and time when the shipment was delivered */
  deliveredAt?: string | null;
  /** Conditional: Date and time when the shipment was cancelled */
  cancelledAt?: string | null;
  /** Conditional: Reason for cancellation if cancelledAt is set */
  cancellationReason?: string | null;
  /** Guaranteed: Creation timestamp (ISO string) */
  createdAt: string;
  /** Guaranteed: Last update timestamp (ISO string) */
  updatedAt: string;
  /** Conditional: Soft deletion timestamp */
  deletedAt?: string | null;

  // Relations (Populated based on Prisma `include`)
  /** Conditional: Populated if `include: { customer: true }` */
  customer?: User;
  /** Conditional: Populated if `include: { courier: true }` and assigned */
  courier?: User | null;
  /** Conditional: Populated if `include: { originZone: true }` */
  originZone?: DeliveryZone;
  /** Conditional: Populated if `include: { destinationZone: true }` */
  destinationZone?: DeliveryZone;
  /** Conditional: Populated if `include: { parcel: true }` */
  parcel?: Parcel | null;
  /** Conditional: Populated if `include: { trackingEvents: true }` */
  trackingEvents?: TrackingEvent[];
  /** Conditional: Populated if `include: { deliveryAttempts: true }` */
  deliveryAttempts?: DeliveryAttempt[];
  /** Conditional: Populated if `include: { payment: true }` */
  payment?: Payment | null;
}

/**
 * Parcel Entity
 * Physical details of the shipment parcel.
 */
export interface Parcel {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Guaranteed: ID of the related shipment */
  shipmentId: string;
  /** Guaranteed: Weight in kg, decimal as string */
  weight: string;
  /** Guaranteed: Length in cm, decimal as string */
  length: string;
  /** Guaranteed: Width in cm, decimal as string */
  width: string;
  /** Guaranteed: Height in cm, decimal as string */
  height: string;
  /** Optional: Description of the parcel contents */
  description?: string | null;
  /** Guaranteed: Fragile flag */
  isFragile: boolean;
  /** Guaranteed: Creation timestamp (ISO string) */
  createdAt: string;
  /** Guaranteed: Last update timestamp (ISO string) */
  updatedAt: string;

  /** Conditional: Populated if relation is included */
  shipment?: Shipment;
}

/**
 * TrackingEvent Entity
 * Immutable log of shipment status changes and locations.
 */
export interface TrackingEvent {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Guaranteed: ID of the related shipment */
  shipmentId: string;
  /** Guaranteed: Status at the time of the event */
  status: ShipmentStatus;
  /** Guaranteed: Descriptive text for the event */
  description: string;
  /** Optional: Location string where the event occurred */
  location?: string | null;
  /** Conditional: ID of the actor (User) performing the action, null if system */
  actorId?: string | null;
  /** Guaranteed: Creation timestamp (ISO string), immutable */
  createdAt: string;

  /** Conditional: Populated if relation is included */
  shipment?: Shipment;
  /** Conditional: Populated if relation is included and actorId is present */
  actor?: User | null;
}

/**
 * DeliveryAttempt Entity
 * Log of physical delivery attempts by couriers.
 */
export interface DeliveryAttempt {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Guaranteed: ID of the related shipment */
  shipmentId: string;
  /** Guaranteed: ID of the courier attempting the delivery */
  courierId: string;
  /** Guaranteed: Attempt sequence number (1, 2, or 3) */
  attemptNumber: number;
  /** Guaranteed: Outcome of the attempt */
  status: DeliveryAttemptStatus;
  /** Conditional: Required if status is FAILED */
  failureReason?: string | null;
  /** Optional: Additional notes from the courier */
  notes?: string | null;
  /** Guaranteed: Timestamp of the attempt */
  attemptedAt: string;

  /** Conditional: Populated if relation is included */
  shipment?: Shipment;
  /** Conditional: Populated if relation is included */
  courier?: User;
}

/**
 * Payment Entity
 * Log of financial transactions and payment states.
 */
export interface Payment {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Guaranteed: ID of the related shipment */
  shipmentId: string;
  /** Guaranteed: Financial amount, decimal as string */
  amount: string;
  /** Guaranteed: Currency code, e.g., BDT */
  currency: string;
  /** Guaranteed: Current status of the payment */
  status: PaymentStatus;
  /** Guaranteed: Method of payment (STRIPE, BKASH) */
  method: PaymentMethod;
  /** Conditional: Stripe Checkout Session ID */
  stripeSessionId?: string | null;
  /** Conditional: Stripe Payment Intent ID */
  stripePaymentIntentId?: string | null;
  /** Conditional: bKash Payment ID */
  bkashPaymentId?: string | null;
  /** Conditional: bKash Transaction ID */
  bkashTrxId?: string | null;
  /** Conditional: Unified transaction reference */
  transactionId?: string | null;
  /** Optional: Intentionally unknown exact structure, raw gateway payload for debugging */
  gatewayResponse?: Record<string, unknown> | null;
  /** Conditional: Timestamp of successful payment */
  paidAt?: string | null;
  /** Conditional: Timestamp of refund */
  refundedAt?: string | null;
  /** Guaranteed: Creation timestamp (ISO string) */
  createdAt: string;
  /** Guaranteed: Last update timestamp (ISO string) */
  updatedAt: string;

  /** Conditional: Populated if relation is included */
  shipment?: Shipment;
}

/**
 * DeliveryZone Entity
 * Operational delivery areas mapped to cities.
 */
export interface DeliveryZone {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Guaranteed: Unique name of the zone */
  name: string;
  /** Guaranteed: City the zone belongs to */
  city: string;
  /** Guaranteed: Active status flag */
  isActive: boolean;
  /** Guaranteed: Creation timestamp (ISO string) */
  createdAt: string;
  /** Guaranteed: Last update timestamp (ISO string) */
  updatedAt: string;
  /** Conditional: Soft deletion timestamp */
  deletedAt?: string | null;

  /** Conditional: Populated if relation is included */
  pricingRules?: PricingRule[];
}

/**
 * PricingRule Entity
 * Rules for calculating shipping costs based on zone and weight.
 */
export interface PricingRule {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Conditional: Zone ID, null for default/fallback rules */
  zoneId?: string | null;
  /** Guaranteed: Applicable service type */
  serviceType: ServiceType;
  /** Guaranteed: Base price, decimal as string */
  basePrice: string;
  /** Guaranteed: Per kg price, decimal as string */
  pricePerKg: string;
  /** Optional: Max applicable weight for this rule, decimal as string */
  maxWeight?: string | null;
  /** Guaranteed: Active status flag */
  isActive: boolean;
  /** Guaranteed: Creation timestamp (ISO string) */
  createdAt: string;
  /** Guaranteed: Last update timestamp (ISO string) */
  updatedAt: string;

  /** Conditional: Populated if relation is included and zoneId is present */
  zone?: DeliveryZone | null;
}

/**
 * AuditLog Entity
 * System-wide audit trails for crucial changes.
 */
export interface AuditLog {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Conditional: ID of the user performing the action, null if system */
  actorId?: string | null;
  /** Guaranteed: String identifier of the action performed */
  action: string;
  /** Guaranteed: Target entity type (e.g., 'shipment') */
  entity: string;
  /** Guaranteed: ID of the target entity */
  entityId: string;
  /** Optional: Intentionally unknown structure, previous JSON state */
  oldValue?: Record<string, unknown> | null;
  /** Optional: Intentionally unknown structure, new JSON state */
  newValue?: Record<string, unknown> | null;
  /** Optional: IP address of the actor */
  ipAddress?: string | null;
  /** Optional: Descriptive text of the action */
  description?: string | null;
  /** Guaranteed: Creation timestamp (ISO string), immutable */
  createdAt: string;

  /** Conditional: Populated if relation is included and actorId is present */
  actor?: User | null;
}

/**
 * Notification Entity
 * User-facing alerts and messages.
 */
export interface Notification {
  /** Guaranteed: Unique identifier */
  id: string;
  /** Guaranteed: ID of the recipient user */
  userId: string;
  /** Guaranteed: Type of the notification (e.g., SHIPMENT_UPDATE) */
  type: string;
  /** Guaranteed: Title of the notification */
  title: string;
  /** Guaranteed: Message body */
  message: string;
  /** Optional: ID of the related entity */
  referenceId?: string | null;
  /** Optional: Type of the related entity (e.g., 'shipment') */
  referenceType?: string | null;
  /** Guaranteed: Read status flag */
  isRead: boolean;
  /** Guaranteed: Creation timestamp (ISO string) */
  createdAt: string;

  /** Conditional: Populated if relation is included */
  user?: User;
}

// ----------------------------------------------------------------------
// Request & Response Types (DTOs)
// ----------------------------------------------------------------------

/**
 * Standard Paginated API Response Wrapper
 */
export interface PaginatedResponse<T> {
  /** Guaranteed: Array of requested entities */
  data: T[];
  /** Guaranteed: Pagination metadata */
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// --- DTOs ---

export interface CreateShipmentInput {
  originAddress: string;
  originCity: string;
  originZoneId: string;
  destinationAddress: string;
  destinationCity: string;
  destinationZoneId: string;
  recipientName: string;
  recipientPhone: string;
  serviceType: ServiceType;
  notes?: string;
  parcel: {
    weight: number;
    length: number;
    width: number;
    height: number;
    description?: string;
    isFragile: boolean;
  };
}

export interface UpdateShipmentStatusInput {
  status: ShipmentStatus;
  location?: string;
  notes?: string;
}

export interface AssignCourierInput {
  courierId: string;
}

export interface RecordDeliveryAttemptInput {
  status: DeliveryAttemptStatus;
  failureReason?: string;
  notes?: string;
  location?: string;
}

export interface CreateZoneInput {
  name: string;
  city: string;
  isActive?: boolean;
}

export interface UpdateZoneInput {
  name?: string;
  city?: string;
  isActive?: boolean;
}

export interface CreatePricingRuleInput {
  zoneId?: string;
  serviceType: ServiceType;
  basePrice: number;
  pricePerKg: number;
  maxWeight?: number;
}
