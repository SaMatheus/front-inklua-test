'use client'
import { useQuery } from '@tanstack/react-query'
import { axios } from 'app/_lib/axios'
import JobList from './JobList'
import JobsTitle from './JobsTitle'
import styles from './styles.module.scss'
import { Filters } from '../../_types/filter'
import Filter from '../Filter'
import Loading from '../Loading'

const MyJobs = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['filter'],
    queryFn: () => axios.get<{ filters: Filters }>('/test-search').then((res) => res.data)
  });

  return (
    <>
      {isPending && <Loading />}
      {error && <p>Ocorreu um erro ao carregar os dados.</p>}
      {data && !isPending && !error && (
        <div className={styles.wrapper}>
          <JobsTitle />
          <div className={styles.content}>
            <Filter />
            <JobList />
          </div>
        </div>
      )}
    </>
  )
}

export default MyJobs