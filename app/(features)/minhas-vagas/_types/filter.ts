export enum KeyEnum {
  city = 'city',
  salary = 'salary',
  workModel = 'workModel'
}

export interface FilterDataProps {
  label: string;
  value: number | string;
  amount: number;
  selected: boolean;
}

export interface Filters {
  city: FilterDataProps[];
  salary: FilterDataProps[];
  search: string | null;
  workModel: FilterDataProps[];
}