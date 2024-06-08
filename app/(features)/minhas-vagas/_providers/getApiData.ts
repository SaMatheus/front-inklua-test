import { axios } from 'app/_lib/axios'

interface ParamsProps {
  page: number
  search: string
  city: string // separado por ; ex: 'São Paulo;Rio de Janeiro'
  workModel: string // separado por ; ex: 'remote;local'
  salary: number
}

const getApiData = async (params?: ParamsProps) => {
  const response = await axios.get('/test-search', { params })
  return response.data
}

export default getApiData;