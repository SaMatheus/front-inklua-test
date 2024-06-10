'use client'
import { useQuery } from '@tanstack/react-query'
import PageTitle from './PageTitle'
import styles from './styles.module.scss'
import getApiData from '../../_providers/getApiData'
import { useMobileStore } from '../../_store/MobileStore'
import Filter from '../Filter'
import Jobs from '../Jobs'
import Loading from '../Loading'
import { useJobsStore } from '../../_store/JobsStore'
import { useEffect } from 'react'
import { useFilterStore } from '../../_store/FilterStore'
import { Pagination } from '@Inklua/components-library'
import { PaginationStore } from '../../_store/PaginationStore'

const SearchJobs = () => {
  const { isMobile } = useMobileStore();
  const { setJobs } = useJobsStore();
  const { setFilters } = useFilterStore();
  const { pagination, setPagination, onPageChange } = PaginationStore();

  const { isPending, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () => getApiData()
  });

  useEffect(() => {
    if (!isPending && !error && data) {
      setJobs(data.jobs)
      setFilters(data.filters)
      setPagination(data.pagination)
    }
  }, [isPending, data, error])

  return (
    <>
      {isPending && <Loading />}
      {!isPending && !error && data && (
        <div className={isMobile ? styles.wrapperMobile : styles.wrapper}>
          <PageTitle />
          <div className={styles.content}>
            <Filter />
            <Jobs />
          </div>
          <Pagination
            currentPage={pagination.current}
            onPageChange={(clickedPage) => onPageChange(Number(clickedPage))}
            pageSize={pagination.pages}
            siblingCount={isMobile ? 0 : 1}
            totalCount={pagination.total}
          />
        </div>
      )}
    </>
  )
}

export default SearchJobs