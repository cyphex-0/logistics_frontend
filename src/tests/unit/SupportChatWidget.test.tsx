import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SupportChatWidget } from '@/components/support/SupportChatWidget';
import { supportService } from '@/services/support.service';

// Mock supportService
jest.mock('@/services/support.service', () => ({
  supportService: {
    sendMessage: jest.fn(),
  },
}));

// Mock scrollIntoView for jsdom
window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe('SupportChatWidget Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders floating launcher button closed by default', () => {
    render(<SupportChatWidget />);
    const button = screen.getByRole('button', { name: /Open AI Support Chat/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog', { name: /Shiply AI Support Chat/i })).not.toBeInTheDocument();
  });

  it('opens and closes chat panel when trigger button is clicked', async () => {
    render(<SupportChatWidget />);
    const trigger = screen.getByRole('button', { name: /Open AI Support Chat/i });
    fireEvent.click(trigger);

    expect(screen.getByRole('dialog', { name: /Shiply AI Support Chat/i })).toBeInTheDocument();
    expect(screen.getByText('Shiply Assistant')).toBeInTheDocument();

    // Close button
    const closeBtn = screen.getByRole('button', { name: /Close chat/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog', { name: /Shiply AI Support Chat/i })).not.toBeInTheDocument();
  });

  it('closes panel when Escape key is pressed', () => {
    render(<SupportChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Open AI Support Chat/i }));
    expect(screen.getByRole('dialog', { name: /Shiply AI Support Chat/i })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: /Shiply AI Support Chat/i })).not.toBeInTheDocument();
  });

  it('renders suggested question chips and sends message when clicked', async () => {
    (supportService.sendMessage as jest.Mock).mockResolvedValueOnce({
      message: 'Pricing starts at base price + weight * rate.',
      requestId: 'test-req-123',
      grounded: true,
    });

    render(<SupportChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Open AI Support Chat/i }));

    // Find suggested question button
    const suggestionBtn = screen.getByText('How is price calculated?');
    expect(suggestionBtn).toBeInTheDocument();

    fireEvent.click(suggestionBtn);

    // Should call supportService
    await waitFor(() => {
      expect(supportService.sendMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'How is parcel shipping pricing calculated in Shiply?',
          locale: 'en',
        })
      );
    });

    // Should render response
    expect(await screen.findByText('Pricing starts at base price + weight * rate.')).toBeInTheDocument();
    expect(screen.getByText('• Verified Info')).toBeInTheDocument();
  });

  it('allows user to type a question and submit with Enter key', async () => {
    const user = userEvent.setup();
    (supportService.sendMessage as jest.Mock).mockResolvedValueOnce({
      message: 'We cover all 8 administrative divisions of Bangladesh.',
      requestId: 'test-req-456',
      grounded: true,
    });

    render(<SupportChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Open AI Support Chat/i }));

    const textarea = screen.getByPlaceholderText(/Ask a question/i);
    await user.type(textarea, 'Which divisions do you support?{enter}');

    await waitFor(() => {
      expect(supportService.sendMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Which divisions do you support?',
          locale: 'en',
        })
      );
    });

    expect(await screen.findByText('We cover all 8 administrative divisions of Bangladesh.')).toBeInTheDocument();
  });

  it('toggles language between English and Bengali', () => {
    render(<SupportChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Open AI Support Chat/i }));

    // Initial state is English
    expect(screen.getByText('Welcome! How can we help?')).toBeInTheDocument();

    // Click language toggle
    const langBtn = screen.getByRole('button', { name: /BN/i });
    fireEvent.click(langBtn);

    // Now state is Bengali
    expect(screen.getByText('স্বাগতম! কীভাবে সাহায্য করতে পারি?')).toBeInTheDocument();
    expect(screen.getByText('খরচ কীভাবে হিসাব করা হয়?')).toBeInTheDocument();
  });

  it('handles service errors gracefully with retry button', async () => {
    (supportService.sendMessage as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<SupportChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Open AI Support Chat/i }));

    const textarea = screen.getByPlaceholderText(/Ask a question/i);
    fireEvent.change(textarea, { target: { value: 'Is delivery available today?' } });
    const sendBtn = screen.getByRole('button', { name: /Send message/i });
    fireEvent.click(sendBtn);

    expect(
      await screen.findByText(/Unable to connect to support service/i)
    ).toBeInTheDocument();
    expect(screen.getByText('Retry sending')).toBeInTheDocument();
  });

  it('clears conversation when reset button is clicked', async () => {
    (supportService.sendMessage as jest.Mock).mockResolvedValueOnce({
      message: 'Payment methods include Stripe and bKash.',
      requestId: 'test-req-789',
      grounded: true,
    });

    render(<SupportChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /Open AI Support Chat/i }));

    const suggestionBtn = screen.getByText('Supported payment methods');
    fireEvent.click(suggestionBtn);

    expect(await screen.findByText('Payment methods include Stripe and bKash.')).toBeInTheDocument();

    // Click clear conversation
    const clearBtn = screen.getByRole('button', { name: /Clear chat/i });
    fireEvent.click(clearBtn);

    // Messages should be cleared and welcome state shown
    expect(screen.queryByText('Payment methods include Stripe and bKash.')).not.toBeInTheDocument();
    expect(screen.getByText('Welcome! How can we help?')).toBeInTheDocument();
  });
});
