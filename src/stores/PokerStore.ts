import { create } from "zustand";
import { api } from "../libs/api";
import { sendEvent, onEvent, disconnectSocket } from "../libs/socket";
import type { User } from "./UserStore";

interface Player {
  id: string;
  name: string;
  selectedCard: string | null;
}

interface UserContext {
  id: string;
  name: string;
  role: "facilitator" | "observer" | "voter";
  canVote: boolean;
}

interface Vote {
  user: UserContext;
  value: string;
}
interface RoomState {
  roomId: string;
  votes: Vote[];
  revealed: boolean;
  users: UserContext[];
  story?: string;
}

interface PokerState {
  players: Player[];
  showCards: boolean;
  story?: string;
  room?: string;
  revealed?: boolean;
  selectCard: (id: string, card: string) => void;
  toggleShowCards: () => void;
  addPlayer: (player: Player) => void;
  reset: () => void;
  joinRoom: (room: string, user: User) => void;
  vote: (room: string, user: string, value: string) => void;
  reveal: (room: string) => void;
  setStory: (room: string, story: string) => void;
  leaveRoom: () => void;
  fetchPlayers: () => Promise<void>;
  createRoom: (user: User) => Promise<void>;
}

export const usePokerStore = create<PokerState>((set, get) => {
  // Listen for state updates from server
  onEvent("state", (state: RoomState) => {
    console.log("[PokerStore] Received state update", state);
    set({
      players: state.users.map((u) => ({
        id: u.id,
        name: u.name,
        selectedCard:
          state.votes?.find((v) => v.user.id === u.id)?.value || null,
      })),
      showCards: state.revealed,
      story: state.story,
      room: state.roomId,
      revealed: state.revealed,
    });
  });

  return {
    fetchPlayers: async () => {
      try {
        const data = await api.get("/players");
        // Assuming API returns array of players with id, name, selectedCard
        set({ players: data });
      } catch (err) {
        console.error("Failed to fetch players:", err);
      }
    },
    createRoom: async (user: User) => {
      try {
        sendEvent("createRoom", { user });
      } catch (err) {
        console.error("Failed to create room:", err);
      }
    },
    players: [],
    showCards: false,
    selectCard: (id, card) => {
      const room = get().room;
      const user = get().players.find((p) => p.id === id);
      if (room && user) {
        sendEvent("vote", { room, user, value: card });
      }
    },
    toggleShowCards: () => {
      const room = get().room;
      if (room) sendEvent("reveal", { room });
    },
    addPlayer: (player) => {
      set((state) => ({
        players: [...state.players, player],
      }));
    },
    reset: () => {
      const room = get().room;
      if (room) sendEvent("reset", { room });
    },
    joinRoom: (room, user) => {
      sendEvent("join", { room, user });
    },
    vote: (room, user, value) => {
      sendEvent("vote", { room, user, value });
    },
    reveal: (room) => {
      sendEvent("reveal", { room });
    },
    setStory: (room, story) => {
      sendEvent("setStory", { room, story });
    },
    leaveRoom: () => {
      disconnectSocket();
      set({
        players: [],
        showCards: false,
        room: undefined,
        story: undefined,
        revealed: false,
      });
    },
  };
});
