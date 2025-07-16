import { create } from 'zustand';
import { dummySprints, type Sprint} from '../data/pokerData';

type State = {
  sprints: Sprint[];
  selectedSprintId: string;
  setSelectedSprintId: (id: string) => void;
};

export const useSprintStore = create<State>((set) => ({
  sprints: dummySprints,
  selectedSprintId: dummySprints[0].id,
  setSelectedSprintId: (id: string) => set({ selectedSprintId: id }),
}));
