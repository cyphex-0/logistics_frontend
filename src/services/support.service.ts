import { apiClient } from '@/lib/api/client';
import { SupportChatRequest, SupportChatResponseData } from '@/types/support';

export const supportService = {
  /**
   * Sends a message to the AI support assistant via the backend endpoint (/api/v1/support/chat)
   */
  async sendMessage(payload: SupportChatRequest): Promise<SupportChatResponseData> {
    const res = await apiClient<SupportChatResponseData>('/support/chat', {
      method: 'POST',
      body: payload
    });

    // If backend returned ungrounded fallback, handle common verified intents
    if (!res.grounded) {
      const lower = payload.message.toLowerCase();

      // Booking / Shipping intent
      if (
        lower.includes('ship') ||
        lower.includes('send') ||
        lower.includes('book') ||
        lower.includes('parcel') ||
        lower.includes('package') ||
        lower.includes('বুক') ||
        lower.includes('পাঠাব') ||
        lower.includes('পাঠাতে')
      ) {
        return {
          requestId: res.requestId || crypto.randomUUID(),
          grounded: true,
          message:
            payload.locale === 'bn'
              ? 'শিপলিতে পার্সেল বুক করার নিয়ম:\n১. আপনার অ্যাকাউন্টে [লগইন করুন](/auth/login)।\n২. ড্যাশবোর্ড থেকে [Book Shipment](/dashboard/shipments/new)-এ যান।\n৩. পিকআপ এবং ডেলিভারি জোন নির্বাচন করে ঠিকানা ও ফোন নম্বর প্রদান করুন।\n৪. স্ট্যান্ডার্ড বা এক্সপ্রেস সার্ভিস নির্বাচন করুন।\n৫. নির্ধারিত ফি দেখে স্ট্রাইপ (Stripe) বা বিকাশ (bKash)-এর মাধ্যমে পেমেন্ট সম্পন্ন করুন।'
              : 'To book and ship a parcel on Shiply:\n1. [Sign in to your account](/auth/login) (or [Register](/auth/register) if you are new).\n2. Navigate to [Book Shipment](/dashboard/shipments/new) in your customer dashboard.\n3. Select your pickup and destination zones, and enter detailed sender and recipient addresses with contact phone numbers.\n4. Choose your service type (Standard or Express) and specify parcel details.\n5. Review the calculated price and complete payment securely via Stripe or bKash.'
        };
      }

      // Tracking intent
      if (lower.includes('track') || lower.includes('status') || lower.includes('ট্র্যাক') || lower.includes('কোথায়')) {
        return {
          requestId: res.requestId || crypto.randomUUID(),
          grounded: true,
          message:
            payload.locale === 'bn'
              ? 'আপনি আপনার ড্যাশবোর্ডের [Track Shipment](/dashboard/tracking) পেইজে গিয়ে অথবা হোমপেইজের ট্র্যাকিং বক্সে ট্র্যাকিং নম্বর (CLG-YYYYMMDD-XXXXX) লিখে লাইভ পার্সেল ট্র্যাক করতে পারেন।'
              : 'You can track any parcel live by visiting the [Track Shipment](/dashboard/tracking) page in your dashboard or using the tracking bar on the homepage with your tracking number (CLG-YYYYMMDD-XXXXX).'
        };
      }

      // Pricing intent
      if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('fee') || lower.includes('চার্জ') || lower.includes('দাম') || lower.includes('খরচ')) {
        return {
          requestId: res.requestId || crypto.randomUUID(),
          grounded: true,
          message:
            payload.locale === 'bn'
              ? 'শিপিং চার্জ নিয়ম অনুযায়ী হিসাব করা হয়: Base Price + (Weight * Price per kg)। বিস্তারিত রেট জানতে আমাদের [প্রাইসিং পেইজ](/pricing) দেখুন।'
              : 'Shipping rates on Shiply are calculated dynamically: Base Price + (Weight in kg * Price per kg). For complete details and zone pricing, check out our [Pricing Page](/pricing).'
        };
      }
    }

    return res;
  }
};
