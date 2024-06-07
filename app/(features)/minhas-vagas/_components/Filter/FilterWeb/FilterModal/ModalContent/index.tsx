import { Input } from '@Inklua/components-library';
import { useState } from 'react';
import styles from './styles.module.scss';
import { FilterDataProps, KeyEnum } from '../../../../../_types/filter';
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

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filterItems = Object.entries(data).reduce<{ [key: string]: FilterDataProps[] }>((acc, [letter, items]) => {
    const filteredItems = items.filter(
      (item) => removeAccents(item.label.toLowerCase()).includes(removeAccents(inputValue.toLowerCase()))
    );
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