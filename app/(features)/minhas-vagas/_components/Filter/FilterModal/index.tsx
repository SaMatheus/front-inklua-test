import { Modal } from '@Inklua/components-library';
import React, { useCallback, useMemo, useState } from 'react';
import ModalContent from './ModalContent';
import ModalHeader from './ModalHeader';
import styles from './styles.module.scss';
import { DataProps } from '../../../_types/filter';
import ButtonBox from '../../ButtonBox';

type GroupedData = { [key: string]: DataProps[] };

interface FilterModalProps {
  data: DataProps[];
  title: string;
  isOpen: boolean;
  multiCheck?: boolean;
  onClose: () => void;
}

const groupData = (data: DataProps[]): GroupedData => {
  return data.reduce<GroupedData>((groups, item) => {
    const letter = item.label.normalize('NFD')[0].toUpperCase();
    groups[letter] = groups[letter] || [];
    groups[letter].push(item);
    return groups;
  }, {});
};

const FilterModal: React.FC<FilterModalProps> = ({ data, title, isOpen, multiCheck, onClose }) => {
  const [inputValue, setInputValue] = useState<string>();
  const [checkedItems, setCheckedItems] = useState<{ [key: number | string]: boolean }>({});
  const [singleCheckedItem, setSingleCheckedItem] = useState<string | number | null>(null);

  const handleCheckChange = useCallback((value: DataProps['value']): void => {
    if (!multiCheck) setSingleCheckedItem((prevValue) => prevValue === value ? null : value);
    else setCheckedItems((prevState) => ({ ...prevState, [value]: !prevState[value] }));
  }, [multiCheck]);

  const sortedData = useMemo(() => data.sort((a, b) => a.label.localeCompare(b.label)), [data]);
  const groupedData = useMemo(() => groupData(sortedData), [sortedData]);

  return isOpen && (
    <Modal closeModal={onClose}>
      <div className={styles.wrapper}>
        <ModalHeader title={title} onClose={onClose} />
        <ModalContent
          checkedItems={checkedItems}
          data={groupedData}
          handleCheckChange={handleCheckChange}
          inputValue={inputValue}
          onChange={setInputValue}
          multiCheck={multiCheck}
          singleCheckedItem={singleCheckedItem}
        />
        <ButtonBox isModal />
      </div>
    </Modal>
  );
};

export default FilterModal;