import { create } from 'zustand';
import { DataProps, Filters } from '../_types/filter';

type FilterStore = {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  checkedItems: { [key: number | string]: boolean };
  setCheckedItems: (value: DataProps['value']) => void;
  singleCheckedItem: string | number | null;
  setSingleCheckedItem: (value: string | number | null) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {} as Filters,
  setFilters: (filters) => set({ filters }),
  checkedItems: {},
  setCheckedItems: (value) => set(({ checkedItems }) => (
    { checkedItems: { ...checkedItems, [value]: !checkedItems[value] } }
  )),
  singleCheckedItem: null,
  setSingleCheckedItem: (value) => set(({ singleCheckedItem }) => (
    singleCheckedItem === value ? { singleCheckedItem: null } : { singleCheckedItem: value }
  )),
}));