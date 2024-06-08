'use client'
import { useQuery } from '@tanstack/react-query'
import PageTitle from './PageTitle'
import styles from './styles.module.scss'
import getApiData from '../../_providers/getApiData'
import { useMobileStore } from '../../_store/MobileStore'
import Filter from '../Filter'
import Jobs from '../Jobs'
import Loading from '../Loading'

const SearchJobs = () => {
  const { isMobile } = useMobileStore();
  const { data, isPending } = useQuery({
    queryKey: ['filter'],
    queryFn: () => getApiData()
  });

  return (
    <>
      {isPending && <Loading />}
      {data && (
        <div className={isMobile ? styles.wrapperMobile : styles.wrapper}>
          <PageTitle />
          <div className={styles.content}>
            <Filter />
            <Jobs />
          </div>
        </div>
      )}
    </>
  )
}

export default SearchJobs