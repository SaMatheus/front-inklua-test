import { Splitter } from '@Inklua/components-library';
import React from 'react';
import styles from './styles.module.scss';
import { DataProps } from '../../../../../_types/filter';
import ModalList from '../ModalList';

interface ModalGroupProps {
  letter: string;
  data: DataProps[];
  multiCheck?: boolean;
  checkedItems: { [key: number | string]: boolean };
  handleCheckChange: (value: DataProps['value']) => void;
  singleCheckedItem: string | number | null;
}

const ModalGroup = ({
    letter,
    data,
    checkedItems,
    handleCheckChange,
    multiCheck,
    singleCheckedItem
  }: ModalGroupProps) => (
  <>
    <div className={styles.ascBox}>
      <h2>{letter}</h2>
      <div className={styles.gridItems}>
        <ModalList items={data} checkedItems={checkedItems} handleCheckChange={handleCheckChange} multiCheck={multiCheck} singleCheckedItem={singleCheckedItem} />
      </div>
    </div>
    <Splitter />
  </>
);

export default ModalGroup;