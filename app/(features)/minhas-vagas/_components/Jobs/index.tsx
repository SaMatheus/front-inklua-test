'use client'
import JobBox from './JobsList';
import styles  from './styles.module.scss';
import { useMobileStore } from '../../_store/MobileStore';
const Jobs = () => {
  const { isMobile } = useMobileStore();
  return (
      <div className={isMobile ? styles.wrapperMobile : styles.wrapper}>
          <JobBox />
      </div>
  )
}

export default Jobs;