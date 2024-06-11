import { axios } from 'app/_lib/axios'
import { ParamsProps } from '../_types';

const getApiData = async (params?: ParamsProps) => {
  const response = await axios.get('/test-search', { params })
  return response.data
}

export default getApiData;