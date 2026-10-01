import { apiClient } from "@/lib/api/client";
import { PaymentMethod } from "@/types/api";

export interface InitiatePaymentPayload {
  shipmentId: string;
  method: PaymentMethod;
}

export interface InitiatePaymentResponse {
  paymentUrl: string;
  paymentId: string;
}

export const paymentService = {
  initiatePayment: (data: InitiatePaymentPayload) => {
    return apiClient<InitiatePaymentResponse>("/payments/initiate", {
      method: "POST",
      body: data,
    });
  },

  refundPayment: (data: { shipmentId: string; reason?: string }) => {
    return apiClient<unknown>("/payments/refund", {
      method: "POST",
      body: data,
    });
  },
};

