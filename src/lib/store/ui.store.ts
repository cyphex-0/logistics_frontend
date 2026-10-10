import { create } from "zustand";

interface UIState {
  isMobileNavOpen: boolean;
  setMobileNavOpen: (isOpen: boolean) => void;
  toggleMobileNav: () => void;
  isGlobalLoading: boolean;
  setGlobalLoading: (isLoading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileNavOpen: false,
  setMobileNavOpen: (isOpen) => set({ isMobileNavOpen: isOpen }),
  toggleMobileNav: () => set((state) => ({ isMobileNavOpen: !state.isMobileNavOpen })),
  isGlobalLoading: false,
  setGlobalLoading: (isOpen) => set({ isGlobalLoading: isOpen }),
}));
