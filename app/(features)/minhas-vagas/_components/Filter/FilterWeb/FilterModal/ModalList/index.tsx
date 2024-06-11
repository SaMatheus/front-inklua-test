'use client'
import { CheckboxCell } from '@Inklua/components-library';
import React from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import styles from './styles.module.scss';
import { FilterDataProps, KeyEnum } from '../../../../../_types';

interface ModalList {
  items: FilterDataProps[];
  handleCheckChange: (key: KeyEnum, item: FilterDataProps) => void;
  keyFilter: KeyEnum;
}


const FilterList: React.FC<ModalList> = ({ items, handleCheckChange, keyFilter }) => {
  const {
    cityFilter
  } = useFilterStore();

  return (
    items.map((item) => {
      const isChecked = cityFilter.find((filter) => filter.value === item.value)
      return (
        <div key={item.value} className={styles.checkboxInput}>
          <CheckboxCell
            label={item.label}
            checked={isChecked}
            onChange={() => handleCheckChange(keyFilter, item)}
          />
          ({item.amount && item.amount})
        </div>
      )
    })
  )
};

export default FilterList;