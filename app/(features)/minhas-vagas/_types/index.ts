export enum KeyEnum {
  city = 'city',
  salary = 'salary',
  workModel = 'workModel'
}

type WorkModel = 'Híbrido' | 'Remoto' | 'Presencial'

export type PaginationData = {
  total: number,
  pages: number,
  current: number,
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

export interface PaginationProps {
  pagination: PaginationData;
  setPagination: (data: PaginationData) => void;
  onPageChange: (page: number) => void;
}

export interface JobsProps {
  id: number;
  uri: string;
  title: string;
  salary: string;
  location: string;
  company: string;
  workModel: [WorkModel];
  publishedAt: string;
  description: string;
}

export interface ParamsProps {
  page?: number;
  search?: string;
  city?: string;
  workModel?: string;
  salary?: number;
}