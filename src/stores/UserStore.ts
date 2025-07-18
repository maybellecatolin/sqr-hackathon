import { create } from "zustand";
import { sendEvent, socketOnce } from "../libs/socket";

export interface User {
  id: string;
  name: string;
  role: "facilitator" | "observer" | "voter";
  canVote: boolean;
}

interface UserState {
  user: User;
  setUser: (name: string) => void;
  setRole: (id: string, role: User["role"]) => void;
}

export const useUserStore = create<UserState>((set) => {
  socketOnce("userCreated", (user: User) => {
    console.log("[UserStore] User created:", user);
    set({ user });
  });
  socketOnce("roleSet", (user: User) => {
    console.log("[UserStore] User role set:", user);
    set((state) => ({
      user: { ...state.user, role: user.role, canVote: user.canVote },
    }));
  });

  return {
    user: { id: "", name: "", role: "observer", canVote: false },
    setUser: (name: string) => {
      sendEvent("createUser", { name });
    },
    setRole: (id: string, role: User["role"]) => {
      sendEvent("setRole", { id, role });
    },
  };
});
