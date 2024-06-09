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
  setCityFilter: (city) => set((state) => {
    const exists = state.cityFilter.some((item) => item.value === city.value);
    const updatedCityFilter = state.cityFilter.filter((item) => item.value !== city.value);
  
    return {
      cityFilter: exists ? updatedCityFilter : [...updatedCityFilter, city]
    };
  }),
  workModelFilter: [],
  setWorkModelFilter: (workModel) => set((state) => {
    const exists = state.workModelFilter.some((item) => item.value === workModel.value);
    const updatedWorkModelFilter = state.workModelFilter.filter((item) => item.value !== workModel.value);

    return {
      workModelFilter: exists ? updatedWorkModelFilter : [...updatedWorkModelFilter, workModel]
    };
  }),
  salaryFilter: [],
  setSalaryFilter: (salary) => set((state) => {
    const exists = state.salaryFilter.some((item) => item.value === salary.value);
    const updatedSalaryFilter = state.salaryFilter.filter((item) => item.value !== salary.value);

    return {
      salaryFilter: exists ? updatedSalaryFilter : [...updatedSalaryFilter, salary]
    };
  }),
  clearFilters: () => set({ cityFilter: [], workModelFilter: [], salaryFilter: [] }),
}));