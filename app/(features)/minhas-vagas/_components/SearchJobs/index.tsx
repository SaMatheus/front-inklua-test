'use client'
import { useMutation, useQuery } from '@tanstack/react-query'
import PageTitle from './PageTitle'
import styles from './styles.module.scss'
import getApiData from '../../_providers/getApiData'
import { useMobileStore } from '../../_store/MobileStore'
import Filter from '../Filter'
import Jobs from '../Jobs'
import { useJobsStore } from '../../_store/JobsStore'
import { useEffect } from 'react'
import { useFilterStore } from '../../_store/FilterStore'
import { Pagination } from '@Inklua/components-library'
import { PaginationStore } from '../../_store/PaginationStore'
import LoadingPage from '../LoadingPage'

const SearchJobs = () => {
  const { isMobile } = useMobileStore();
  const { setJobs } = useJobsStore();
  const { setFilters, setFetchData } = useFilterStore();
  const { pagination, setPagination, onPageChange } = PaginationStore();

  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () => getApiData()
  });

  const mutation = useMutation({
    mutationFn: () => getApiData({ page: pagination.current }),
    onSuccess: (data) => {
      setFetchData(data.filters);
      setJobs(data.jobs)
      setPagination(data.pagination)
    },
    onError: (error) => {
      console.log(error)
    }
  });

  useEffect(() => {
    if (!mutation.data && !isPending && !error && data) {
      setJobs(data.jobs)
      setFilters(data.filters)
      setPagination(data.pagination)
    }
  }, [isPending, data, error])

  useEffect(() => {
    (!isPending && pagination.current) && mutation.mutate()
  }, [pagination.current])

  const handleChangePage = (page: number | string) => {
    onPageChange(Number(page))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const renderData = (!mutation.isPending || !isPending) && (!mutation.error || !error) && (!!mutation.data || !!data)

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