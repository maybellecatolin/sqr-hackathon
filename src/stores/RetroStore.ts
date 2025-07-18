import { create } from "zustand";
import { sendEvent, onEvent, socketOnce } from "../libs/socket";

interface RetroItem {
  id: string;
  text: string;
  type: "wentWell" | "wentWrong" | "toImprove" | "actionItems";
  author: string;
}

interface RetroState {
  items: RetroItem[];
  retroCreateRoom: (roomId: string, facilitator: string) => void;
  addItem: (item: Omit<RetroItem, "id">) => void;
  setItems: (items: RetroItem[]) => void;
  fetchItems: (roomId: string) => void;
}

export const useRetroStore = create<RetroState>((set) => {
  onEvent("retroState", (payload: any) => {
    console.log("[RetroStore] Received retro state update", payload);
    set({ items: payload.items });
  });
  return {
    items: [],
    retroCreateRoom: (roomId: string, facilitator: string) => {
      sendEvent("retroCreateRoom", { roomId, facilitator });
    },
    addItem: (item) => {
      sendEvent("retroAddItem", item);
    },
    setItems: (items) => set({ items }),
    fetchItems: (roomId) => {
      sendEvent("getRetroItems", { roomId });
      socketOnce("retroItems", (items: RetroItem[]) => {
        set({ items });
      });
    },
  };
});
