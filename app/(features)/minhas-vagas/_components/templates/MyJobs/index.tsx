'use client'
import styles from './styles.module.scss'
import SearchJobsTitle from '../../molecules/SearchJobsTitle'
import Filter from '../../organisms/Filter'
import JobList from '../../organisms/JobList'

const MyJobs = () => {
  return (
    <div className={styles.wrapper}>
      <SearchJobsTitle />
      <div className={styles.content}>
        <Filter />
        <JobList />
      </div>
    </div>

  )
}

export default MyJobs