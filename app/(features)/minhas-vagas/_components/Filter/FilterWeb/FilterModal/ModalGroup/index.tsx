'use client'
import { Splitter } from '@Inklua/components-library';
import React from 'react';
import styles from './styles.module.scss';
import { FilterDataProps, KeyEnum } from '../../../../../_types';
import ModalList from '../ModalList';

interface ModalGroupProps {
  letter: string;
  keyFilter: KeyEnum;
  data: FilterDataProps[];
  handleCheckChange: (key: KeyEnum, item: FilterDataProps) => void;
}

const ModalGroup = ({
    letter,
    data,
    handleCheckChange,
    keyFilter
  }: ModalGroupProps) => (
  <>
    <div className={styles.ascBox}>
      <h2>{letter}</h2>
      <div className={styles.gridItems}>
        <ModalList
          items={data}
          handleCheckChange={handleCheckChange}
          keyFilter={keyFilter}
        />
      </div>
    </div>
    <Splitter />
  </>
);

export default ModalGroup;