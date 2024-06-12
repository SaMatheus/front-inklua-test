import { FilterDataProps, ParamsProps } from '../_types';

const buildingFetchParams = (
    search?: string,
    city?: string | FilterDataProps[],
    workModel?: FilterDataProps[],
    salary?: FilterDataProps[],
    page?: number
  ) => {
  const params: ParamsProps = { page: page || 1 };
  const joinData = (data: FilterDataProps[]) => data.map((obj: FilterDataProps) => obj.value).join(';');

  if (!!search) params.search = String(search);
  if (city && city !== 'undefined' && !!city.length) params.city = typeof city === 'string' ? String(city) : joinData(city);
  if (workModel && !!workModel.length) params.workModel = joinData(workModel);
  if (salary && !!salary[0]) params.salary = Number(salary[0].value);

  return params;
}

export default buildingFetchParams;