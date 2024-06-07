import { create } from 'zustand';
import { DataProps, Filters } from '../_types/filter';

type FilterStore = {
  filters: Filters;
  checkedItems: { [key: number | string]: boolean };
  singleCheckedItem: string | number | null;
  setFilters: (filters: Filters) => void;
  setCheckedItems: (value: DataProps['value'], keyFilter: string) => void;
  setSingleCheckedItem: (value: string | number | null, keyFilter: string) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {} as Filters,
  checkedItems: {},
  singleCheckedItem: null,
  setFilters: (filters) => set({ filters }),
  setCheckedItems: (value, keyFilter) => set(({ checkedItems }) => (
    { checkedItems: { ...checkedItems, [`${keyFilter}-${value}`]: !checkedItems[`${keyFilter}-${value}`]} }
  )),
  setSingleCheckedItem: (value,keyFilter) => set(({ singleCheckedItem }) => (
    singleCheckedItem === `${keyFilter}-${value}` ? { singleCheckedItem: null } : { singleCheckedItem: `${keyFilter}-${value}` }
  ))
}));