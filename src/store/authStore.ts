import { create } from 'zustand';
import { ADMIN_CREDENTIALS } from '../data/authData';

interface AuthStore {
  isLoggedIn: boolean;
  currentPassword: string;
  login: () => void;
  logout: () => void;
  updatePassword: (pw: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  currentPassword: ADMIN_CREDENTIALS.password,
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  updatePassword: (pw) => set({ currentPassword: pw }),
}));
