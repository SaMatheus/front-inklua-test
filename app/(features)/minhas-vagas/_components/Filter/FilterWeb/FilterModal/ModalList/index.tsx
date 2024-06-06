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
}

const FilterList: React.FC<ModalList> = ({ items, checkedItems, handleCheckChange, multiCheck, singleCheckedItem }) => (
  items.map((item) => (
    <div key={item.value} className={styles.checkboxInput}>
      <CheckboxCell
        label={item.label}
        checked={multiCheck ? checkedItems[item.value] : item.value === singleCheckedItem}
        onChange={() => handleCheckChange(item.value)}
      />
      ({item.amount && item.amount})
    </div>
  ))
);

export default FilterList;