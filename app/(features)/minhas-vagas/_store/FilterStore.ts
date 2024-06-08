import { create } from 'zustand';
import { FilterDataProps, Filters } from '../_types/filter';

interface FilterStore {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  cityFilter: FilterDataProps[],
  setCityFilter: (city: FilterDataProps) => void,
  workModelFilter: FilterDataProps[],
  setWorkModelFilter: (workModel: FilterDataProps) => void,
  salaryFilter: FilterDataProps[],
  setSalaryFilter: (salary: FilterDataProps) => void,
  clearFilters: () => void,
  positionInput: string,
  setPositionInput: (search: string) => void,
  cityInput: string,
  setCityInput: (search: string) => void,
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: {} as Filters,
  setFilters: (filters) => set({ filters }),
  positionInput: '',
  setPositionInput: (search) => set({ positionInput: search }),
  cityInput: '',
  setCityInput: (search) => set({ cityInput: search }),
  cityFilter: [],
  setCityFilter: (city) => set((state) => state.cityFilter.includes(city)
    ? ({ cityFilter: state.cityFilter.filter((item) => item !== city) })
    : ({ cityFilter: [ ...state.cityFilter, city ] })
  ),
  workModelFilter: [],
  setWorkModelFilter: (workModel) => set((state) => state.workModelFilter.includes(workModel)
    ? ({ workModelFilter: state.workModelFilter.filter((item) => item !== workModel) })
    : ({ workModelFilter: [ ...state.workModelFilter, workModel ] })
  ),
  salaryFilter: [],
  setSalaryFilter: (salary) => set((state) => state.salaryFilter.includes(salary)
    ? ({ salaryFilter: state.salaryFilter.filter((item) => item !== salary) })
    : ({ salaryFilter: [ salary ] })
  ),
  clearFilters: () => set({ cityFilter: [], workModelFilter: [], salaryFilter: [] }),
}));