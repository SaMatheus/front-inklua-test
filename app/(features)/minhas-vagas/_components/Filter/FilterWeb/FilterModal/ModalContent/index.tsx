'use client'
import { Input } from '@Inklua/components-library';
import { useState } from 'react';
import instaDataFilter from 'app/(features)/minhas-vagas/_utils/instaDataFilter';
import styles from './styles.module.scss';
import { FilterDataProps, KeyEnum } from '../../../../../_types';
import ModalGroup from '../ModalGroup';

interface ModalContentProps {
  data: { [key: string]: FilterDataProps[] };
  handleCheckChange: (key: KeyEnum, item: FilterDataProps) => void;
  keyFilter: KeyEnum;
}

const ModalContent = ({
    data,
    handleCheckChange,
    keyFilter
  }: ModalContentProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const filterItems = Object.entries(data).reduce<{ [key: string]: FilterDataProps[] }>((acc, [letter, items]) => {
    const filteredItems = instaDataFilter(items, inputValue)
    if (filteredItems.length) acc[letter] = filteredItems;
    return acc;
  }, {});

  const renderList = () => {
    const originData = Object.entries(inputValue ? filterItems : data)
    return (
      originData.map(([letter, items]) => (
        <ModalGroup
          key={letter}
          letter={letter}
          data={items}
          handleCheckChange={handleCheckChange}
          keyFilter={keyFilter}
        />
      ))
    )
  };

  return (
    <div className={styles.content}>
      <Input
        name='search'
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
        placeholder="Buscar..."
      />
      <div className={styles.list}>
        { renderList() }
      </div>
    </div>
  )
};

export default ModalContent;