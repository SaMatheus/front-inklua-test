import { create } from 'zustand';
import { PaginationData, PaginationStoreProps } from '../_types';

const usePaginationStore = create<PaginationStoreProps>((set) => ({
  pagination: {} as PaginationData,
  setPagination: (data) => set({ pagination: data }),
  onPageChange: (page) => set((state) => ({ pagination: { ...state.pagination, current: page } })),
}))

export default usePaginationStore;