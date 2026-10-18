export interface SupportChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
  grounded?: boolean;
  requestId?: string;
  isError?: boolean;
}

export interface SupportChatRequest {
  message: string;
  history?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  locale?: 'en' | 'bn';
}

export interface SupportChatResponseData {
  message: string;
  requestId: string;
  grounded: boolean;
}

export interface SuggestedQuestion {
  id: string;
  labelEn: string;
  labelBn: string;
  queryEn: string;
  queryBn: string;
}

export const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  {
    id: 'pricing',
    labelEn: 'How is price calculated?',
    labelBn: 'খরচ কীভাবে হিসাব করা হয়?',
    queryEn: 'How is parcel shipping pricing calculated in Shiply?',
    queryBn: 'শিপলিতে পার্সেল ডেলিভারির খরচ কীভাবে হিসাব করা হয়?'
  },
  {
    id: 'zones',
    labelEn: 'Which delivery zones are covered?',
    labelBn: 'কোন কোন অঞ্চলে ডেলিভারি দেন?',
    queryEn: 'Which delivery zones and divisions does Shiply cover?',
    queryBn: 'শিপলি কোন কোন অঞ্চলে ডেলিভারি সেবা দেয়?'
  },
  {
    id: 'booking',
    labelEn: 'How do I book a shipment?',
    labelBn: 'পার্সেল বুকিং কীভাবে করব?',
    queryEn: 'How do I create and book a shipment?',
    queryBn: 'আমি কীভাবে পার্সেল বুকিং করব?'
  },
  {
    id: 'payment',
    labelEn: 'Supported payment methods',
    labelBn: 'পেমেন্ট মাধ্যমসমূহ কি কি?',
    queryEn: 'What payment methods does Shiply support?',
    queryBn: 'শিপলিতে কী কী পেমেন্ট মাধ্যম রয়েছে?'
  }
];
