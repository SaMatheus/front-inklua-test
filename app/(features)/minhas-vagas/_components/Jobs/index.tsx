'use client'
import JobList from './JobsList';
import styles  from './styles.module.scss';
import { useMobileStore } from '../../_store';

const Jobs = () => {
  const { isMobile } = useMobileStore();

  return (
      <div className={isMobile ? styles.wrapperMobile : styles.wrapper}>
        <JobList />
      </div>
  )
}

export default Jobs;