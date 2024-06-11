'use client'
import { Skeleton } from '@Inklua/components-library'
import { ReactElement } from 'react';
import styles from './styles.module.scss'

const FilterSkeleton = () => {
  const renderCheckboxLoading = () => {
    const elements: Array<ReactElement> = [];
    for (let i = 0; i < 3; i++) {
      elements.push(
        <div key={i} className={styles.checkboxLoading}>
          <Skeleton  height='30px' width='30px' />
          <Skeleton  height='30px' width='100%' />
        </div>
      );
    }
    return elements;
  }

  return (
    <div className={styles.wrapper}>
      <Skeleton  height='50px' width='100%' />
      {renderCheckboxLoading()}
      <Skeleton  height='50px' width='100%' />
      <Skeleton  height='50px' width='100%' />
    </div>
  )
}

export default FilterSkeleton