import { FilterDataProps, ParamsProps } from '../_types/filter';

const paramsBuilder = (
    search?: string,
    city?: string | FilterDataProps[],
    workModel?: FilterDataProps[],
    salary?: FilterDataProps[],
    page?: number
  ) => {
  const params: ParamsProps = { page: page || 1 };

  if (!!search) params.search = String(search);
  if (!!city) params.city = typeof city === 'string' ? String(city) : city.join(';');
  if (workModel && !!workModel.length) params.workModel = workModel.map((model: FilterDataProps) => model.value).join(';');
  if (salary && !!salary[0]) params.salary = Number(salary[0].value);

  return params;
}

export default paramsBuilder;