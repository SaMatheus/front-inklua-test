/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Pagination } from '@Inklua/components-library'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import PageTitle from './PageTitle'
import styles from './styles.module.scss'
import useGlobalMutation from '../../_hook/useGlobalMutation'
import getApiData from '../../_providers/getApiData'
import { 
  useFilterStore,
  useJobsStore,
  useMobileStore,
  useMutationStore,
  usePaginationStore
 } from '../../_store'
import Filter from '../Filter'
import Jobs from '../Jobs'
import LoadingPage from '../LoadingPage'

const SearchJobs = () => {
  const { isMobile } = useMobileStore();
  const { setJobs } = useJobsStore();
  const { componentName } = useMutationStore();
  const { reFetch, setFilters } = useFilterStore();
  const { pagination, setPagination, onPageChange } = usePaginationStore();

  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () => getApiData({ page: pagination.current || 1 })
  });

  const mutation = useGlobalMutation({
    params: { page: pagination.current },
    fn: []
  });

  const handleChangePage = (page: number | string) => {
    onPageChange(Number(page))
    typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderData = (!mutation.isPending || !isPending) && (!mutation.error || !error) && (!!mutation.data || !!data)

  useEffect(() => {
    if (!mutation.data && !isPending && componentName === null && !error && data) {
      setJobs(data.jobs)
      setFilters(data.filters)
      setPagination(data.pagination)
    }
  }, [isPending, data, error])

  useEffect(() => {
    if (!isPending && !reFetch && componentName === null) return mutation.mutate()
  }, [pagination.current])

  return (
    <>
      {isPending && <LoadingPage />}
      {renderData && (
        <div className={isMobile ? styles.wrapperMobile : styles.wrapper}>
          <PageTitle />
          <div className={styles.content}>
            <Filter />
            <Jobs />
          </div>
          <Pagination
            currentPage={pagination.current}
            onPageChange={(clickedPage) => handleChangePage(clickedPage)}
            pageSize={pagination.jobsByPage}
            siblingCount={isMobile ? 1 : 5}
            totalCount={pagination.total}
          />
        </div>
      )}
    </>
  )
}

export default SearchJobs