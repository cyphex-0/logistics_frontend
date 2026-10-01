import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService, InitiatePaymentPayload } from "@/services/payment.service";
import { toast } from "sonner";
import { queryKeys } from "./keys";

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (data: InitiatePaymentPayload) => paymentService.initiatePayment(data),
    onSuccess: (data) => {
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        toast.error("Invalid payment URL received from server.");
      }
    },
    onError: (error: Error) => {
      const message = error.message || "Failed to initiate payment";
      toast.error(message);
    },
  });
}

export function useRefundPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { shipmentId: string; reason?: string }) => paymentService.refundPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.shipments.all });
      toast.success("Payment refunded successfully");
    },
  });
}
