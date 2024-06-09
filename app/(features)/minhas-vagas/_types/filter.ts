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

export interface ParamsProps {
  page: number
  search?: string
  city?: string // separado por ; ex: 'São Paulo;Rio de Janeiro'
  workModel?: string // separado por ; ex: 'remote;local'
  salary?: number
}