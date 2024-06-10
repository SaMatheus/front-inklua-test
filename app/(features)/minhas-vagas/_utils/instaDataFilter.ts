import { removeAccents } from './removeStrAccents';
import { FilterDataProps } from '../_types';

const instaDataFilter = (data: FilterDataProps[], input: string) => data.filter((obj) => {
  return removeAccents(obj.label.toLowerCase()).includes(removeAccents(input.toLowerCase()))
});

export default instaDataFilter;