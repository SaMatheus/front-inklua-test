import { CheckboxCell } from '@Inklua/components-library';
import React from 'react';
import styles from './styles.module.scss';
import { DataProps } from '../../../../../_types/filter';

interface ModalList {
  items: DataProps[];
  checkedItems: { [key: number | string]: boolean };
  handleCheckChange: (value: DataProps['value']) => void;
  multiCheck?: boolean;
  singleCheckedItem: string | number | null;
  keyFilter: string;
}

const FilterList: React.FC<ModalList> = ({ items, checkedItems, handleCheckChange, multiCheck, singleCheckedItem, keyFilter }) => (
  items.map((item) => (
    <div key={item.value} className={styles.checkboxInput}>
      <CheckboxCell
        label={item.label}
        checked={multiCheck ? checkedItems[`${keyFilter}-${item.value}`] : `${keyFilter}-${item.value}` === singleCheckedItem}
        onChange={() => handleCheckChange(item.value)}
      />
      ({item.amount && item.amount})
    </div>
  ))
);

export default FilterList;