import { apiClient } from "@/lib/api/client";
import { ShipmentStatus, ServiceType, PaymentMethod, PaymentStatus, TrackingEvent } from "@/types/api";

export interface CreateShipmentPayload {
  originZoneId: string;
  destinationZoneId: string;
  serviceType: ServiceType;
  originAddress: string;
  originCity: string;
  destinationAddress: string;
  destinationCity: string;
  recipientName: string;
  recipientPhone: string;
  parcel: {
    weight: number;
    length: number;
    width: number;
    height: number;
    description?: string;
    isFragile?: boolean;
  };
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  originZoneId: string;
  destinationZoneId: string;
  serviceType: ServiceType;
  originAddress: string;
  originCity: string;
  destinationAddress: string;
  destinationCity: string;
  recipientName: string;
  recipientPhone: string;
  parcel: {
    weight: number;
    length: number;
    width: number;
    height: number;
    description?: string;
    isFragile?: boolean;
  };
  estimatedPrice: number;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
}

export const shipmentService = {
  createShipment: (data: CreateShipmentPayload) => {
    return apiClient<Shipment>("/shipments", {
      method: "POST",
      body: data,
    });
  },

  getShipments: async (params?: { status?: ShipmentStatus; page?: number; limit?: number; trackingNumber?: string }) => {
    const response = await apiClient<{ total: number; page: number; limit: number; data: Shipment[] }>("/shipments", {
      method: "GET",
      params,
    });
    // The backend returns a paginated structure inside data
    return response;
  },

  getShipmentById: (id: string) => {
    return apiClient<Shipment>(`/shipments/${id}`, {
      method: "GET",
    });
  },

  trackShipment: (trackingNumber: string) => {
    return apiClient<Shipment>(`/shipments/track/${trackingNumber}`, {
      method: "GET",
    });
  },

  searchShipments: async (params?: { trackingNumber?: string; status?: ShipmentStatus; page?: number; limit?: number }) => {
    return apiClient<{ total: number; page: number; limit: number; data: Shipment[] }>("/shipments/search", {
      method: "GET",
      params,
    });
  },

  getShipmentTracking: (id: string) => {
    return apiClient<TrackingEvent[]>(`/shipments/${id}/tracking`, {
      method: "GET",
    });
  },
  
  updateShipmentStatus: (id: string, payload: { status: ShipmentStatus; description: string; failureReason?: string }) => {
    return apiClient<Shipment>(`/shipments/${id}/status`, {
      method: "PATCH",
      body: payload,
    });
  },

  updateShipment: (id: string, data: Partial<CreateShipmentPayload>) => {
    return apiClient<Shipment>(`/shipments/${id}`, {
      method: "PATCH",
      body: data,
    });
  },

  cancelShipment: (id: string) => {
    return apiClient<Shipment>(`/shipments/${id}/cancel`, {
      method: "POST",
    });
  },

  assignCourier: (id: string, courierId: string) => {
    return apiClient<Shipment>(`/shipments/${id}/assign`, {
      method: "POST",
      body: { courierId },
    });
  },

  deleteShipment: (id: string) => {
    return apiClient<void>(`/shipments/${id}`, {
      method: "DELETE",
    });
  },
};

