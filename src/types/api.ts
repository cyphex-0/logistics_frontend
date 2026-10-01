export enum UserRole {
  CUSTOMER = "CUSTOMER",
  COURIER = "COURIER",
  ADMIN = "ADMIN",
}

export enum ServiceType {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
}

export enum ShipmentStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PICKUP_ASSIGNED = "PICKUP_ASSIGNED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  FAILED_DELIVERY = "FAILED_DELIVERY",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
}

export enum PaymentMethod {
  STRIPE = "STRIPE",
  BKASH = "BKASH",
}

export enum PaymentStatus {
  INITIATED = "INITIATED",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  EXPIRED = "EXPIRED",
}

export enum DeliveryAttemptStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}

export interface TrackingEvent {
  status: ShipmentStatus;
  description: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: UserRole;
  avatar?: string | null;
  isActive: boolean;
  isAvailable: boolean;
  serviceArea?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CalculatePricePayload {
  destinationZoneId: string;
  serviceType: ServiceType;
  weight: number;
}

export interface PricingResult {
  price: number;
  breakdown: {
    basePrice: number;
    pricePerKg: number;
    weight: number;
    ruleId: string;
    isDefaultFallback: boolean;
  };
}

export interface ApiResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  errors?: ApiFieldError[];
}

export interface ApiFieldError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: ApiFieldError[];
}
