import { apiClient } from '@/lib/api/client';
import { SupportChatRequest, SupportChatResponseData } from '@/types/support';

export const supportService = {
  /**
   * Sends a message to the AI support assistant via the backend endpoint (/api/v1/support/chat)
   */
  async sendMessage(payload: SupportChatRequest): Promise<SupportChatResponseData> {
    return apiClient<SupportChatResponseData>('/support/chat', {
      method: 'POST',
      body: payload
    });
  }
};
