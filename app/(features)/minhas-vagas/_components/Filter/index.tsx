'use client'
import { Heading } from '@Inklua/components-library';
import FilterMobile from './FilterMobile';
import FilterWeb from './FilterWeb';
import styles from './styles.module.scss';
import { useMobileStore } from '../../_store/MobileStore'

const Filter = () => {
  const { isMobile } = useMobileStore();

  return (
    <div className={isMobile ? styles.wrapperMobile : styles.wrapper}>
      <Heading tag='h6'>{ !isMobile && 'Filtrar'}</Heading>
      { isMobile ? <FilterMobile /> : <FilterWeb /> }
    </div>
  )
};

export default Filter;