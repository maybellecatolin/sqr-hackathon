import { create } from 'zustand';

interface Player {
  id: string;
  name: string;
  selectedCard: string | null;
}

interface PokerState {
  players: Player[];
  showCards: boolean;
  selectCard: (id: string, card: string) => void;
  toggleShowCards: () => void;
  addPlayer: (player: Player) => void;
  reset: () => void;
}

export const usePokerStore = create<PokerState>((set) => ({
  players: [],
  showCards: false,
  selectCard: (id, card) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === id ? { ...p, selectedCard: card } : p
      ),
    })),
  toggleShowCards: () =>
    set((state) => ({ showCards: !state.showCards })),
  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, player],
    })),
  reset: () =>
    set(() => ({
      players: [],
      showCards: false,
    })),
}));
