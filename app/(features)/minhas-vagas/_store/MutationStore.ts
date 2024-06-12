import { create } from 'zustand';

interface MutationStoreProps {
  isMutationInProgress: boolean;
  startMutation: () => void;
  endMutation: () => void;
  componentName: string | null;
  setComponentName: (componentName: string | null) => void;
}

const useMutationStore = create<MutationStoreProps>((set) => ({
  isMutationInProgress: false,
  startMutation: () => set({ isMutationInProgress: true }),
  endMutation: () => set({ isMutationInProgress: false }),
  componentName: null,
  setComponentName: (componentName) => set({ componentName }),
}));

export default useMutationStore;