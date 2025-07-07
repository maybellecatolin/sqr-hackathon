import { create } from 'zustand';

interface User {
  name: string;
  role: string;
}

interface UserState {
  user: User;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { name: '', role: '' },
  setUser: (user) => set({ user }),
}));