import { create } from 'zustand';
import { PaginationData, PaginationProps } from '../_types';

export const usePaginationStore = create<PaginationProps>((set) => ({
  pagination: {} as PaginationData,
  setPagination: (data) => set({ pagination: data }),
  onPageChange: (page) => set((state) => ({ pagination: { ...state.pagination, current: page } })),
}))
