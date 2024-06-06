'use client'
import { Heading } from '@Inklua/components-library';
import FilterMobile from './FilterMobile';
import FilterWeb from './FilterWeb';
import styles from './styles.module.scss';
import { useMobileStore } from '../../_store/MobileStore'

const Filter = () => {
  const isMobile = useMobileStore((state) => state.isMobile);

  return (
      <div className={styles.wrapper}>
        <Heading tag='h6'>{ isMobile ? 'Selecione as opções' : 'Filtrar'}</Heading>
        { isMobile ? <FilterMobile /> : <FilterWeb /> }
      </div>
  )
};

export default Filter;