import { create } from 'zustand';
import { PaginationProps, PaginationData } from '../_types';

export const PaginationStore = create<PaginationProps>((set) => ({
  pagination: {} as PaginationData,
  setPagination: (data) => set({ pagination: data }),
  onPageChange: (page) => set((state) => ({ pagination: { ...state.pagination, current: page } })),
}))
