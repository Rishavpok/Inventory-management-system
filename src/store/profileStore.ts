import { create } from 'zustand';
import type { ProfileData } from '../types';

interface ProfileStore extends ProfileData {
  updateProfile: (data: Partial<ProfileData>) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  fullName: "Admin User",
  email: "admin@inventory.com",
  phone: "+977-9800000000",
  department: "Inventory Management",
  location: "Kathmandu, Nepal",
  bio: "",
  updateProfile: (data) => set((state) => ({ ...state, ...data })),
}));
