import { create } from "zustand";

interface UIState {
  isMobileNavOpen: boolean;
  setMobileNavOpen: (isOpen: boolean) => void;
  toggleMobileNav: () => void;
  // Add more ephemeral UI states here as needed
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
}));
