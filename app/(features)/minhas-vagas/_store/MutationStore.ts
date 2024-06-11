import { create } from 'zustand';

interface MutationStore {
  isMutationInProgress: boolean;
  startMutation: () => void;
  endMutation: () => void;
  componentName: string | null;
  setComponentName: (componentName: string | null) => void;
}

export const useMutationStore = create<MutationStore>((set) => ({
  isMutationInProgress: false,
  startMutation: () => set({ isMutationInProgress: true }),
  endMutation: () => set({ isMutationInProgress: false }),
  componentName: null,
  setComponentName: (componentName) => set({ componentName }),
}));