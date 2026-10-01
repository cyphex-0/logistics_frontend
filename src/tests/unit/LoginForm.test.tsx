import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "@/components/auth/LoginForm";
import { useRouter, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

// Mock React Query
jest.mock("@tanstack/react-query", () => ({
  useQueryClient: jest.fn(),
}));

// Mock Sonner
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe("LoginForm UI State", () => {
  let mockPush: jest.Mock;
  let mockInvalidateQueries: jest.Mock;
  
  beforeEach(() => {
    mockPush = jest.fn();
    mockInvalidateQueries = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    (useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries: mockInvalidateQueries });
    (global.fetch as jest.Mock).mockClear();
  });

  it("should show loading state during submission and disable inputs", async () => {
    // Delay the fetch resolution so we can check the loading state
    let resolveFetch!: (value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });

    (global.fetch as jest.Mock).mockReturnValue(fetchPromise);

    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButtons = screen.getAllByRole("button", { name: /Sign In/i });
    const submitButton = submitButtons.find(b => b.textContent === "Sign In") || submitButtons[0];

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Password123!");
    
    // Check initial state
    expect(emailInput).not.toBeDisabled();
    expect(passwordInput).not.toBeDisabled();
    expect(submitButton).not.toBeDisabled();

    // Submit form
    fireEvent.click(submitButton);

    // Wait for the form validation and fetch to be called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Check loading state
    expect(screen.getByRole("button", { name: /Signing in.../i })).toBeInTheDocument();
    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(screen.getByRole("button", { name: /Signing in.../i })).toBeDisabled();

    // Resolve the fetch
    resolveFetch({
      ok: true,
      json: () => Promise.resolve({ user: { role: "CUSTOMER" } }),
    });

    // Wait for resolution
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should map API errors to toast notifications", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Invalid credentials" }),
    });

    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButtons = screen.getAllByRole("button", { name: /Sign In/i });
    const submitButton = submitButtons.find(b => b.textContent === "Sign In") || submitButtons[0];

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "WrongPassword123!");
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });
});
