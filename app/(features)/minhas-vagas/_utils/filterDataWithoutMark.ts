import { FilterDataProps } from '../_types';

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const filterDataWithoutMark = (data: FilterDataProps[], input: string) => data.filter((obj) => {
  return removeAccents(obj.label.toLowerCase()).includes(removeAccents(input.toLowerCase()))
});

export default filterDataWithoutMark;