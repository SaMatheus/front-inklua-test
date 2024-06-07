import { Input } from '@Inklua/components-library';
import { useState } from 'react';
import styles from './styles.module.scss';
import { DataProps } from '../../../../../_types/filter';
import ModalGroup from '../ModalGroup';

interface ModalContentProps {
  data: { [key: string]: DataProps[] };
  multiCheck?: boolean;
  checkedItems: { [key: number | string]: boolean };
  handleCheckChange: (value: DataProps['value']) => void;
  singleCheckedItem: string | number | null;
  keyFilter: string;
}

const ModalContent = ({
    data,
    multiCheck,
    checkedItems,
    singleCheckedItem,
    handleCheckChange,
    keyFilter
  }: ModalContentProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  const filterItems = Object.entries(data).reduce<{ [key: string]: DataProps[] }>((acc, [letter, items]) => {
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
        <>
          <ModalGroup
            key={letter}
            letter={letter}
            data={items}
            checkedItems={checkedItems}
            handleCheckChange={handleCheckChange}
            multiCheck={multiCheck}
            singleCheckedItem={singleCheckedItem}
            keyFilter={keyFilter}
          />
        </>
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

ModalContent.displayName = 'ModalContent';

export default ModalContent;