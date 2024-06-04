'use client'
import styles from './styles.module.scss'
import Filter from '../Filter'
import JobList from '../JobList'
import SearchJobsTitle from '../SearchJobsTitle'

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