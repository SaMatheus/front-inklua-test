type City = {
  label: string,
  value: number,
  amount?: number,
  selected: boolean
};

type Salary = {
  label: string,
  value: number,
  amount?: number,
  selected: boolean
};

type WorkModel = {
  label: string,
  value: number,
  amount?: number,
  selected: boolean
};

export interface Filters {
  city: City[];
  salary: Salary[];
  search: string | null;
  workModel: WorkModel[];
}

export interface DataProps {
  label: string;
  value: number | string;
  amount?: number;
  selected: boolean;
}