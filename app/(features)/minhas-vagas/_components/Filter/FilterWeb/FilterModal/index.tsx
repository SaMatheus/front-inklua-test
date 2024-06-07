import { Modal } from '@Inklua/components-library';
import { useMemo } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import ModalContent from './ModalContent';
import ModalHeader from './ModalHeader';
import styles from './styles.module.scss';
import { DataProps, KeyEnum } from '../../../../_types/filter';
import ButtonBox from '../../ButtonBox';

type GroupedData = { [key: string]: DataProps[] };

interface FilterModalProps {
  title: string;
  isOpen: boolean;
  multiCheck?: boolean;
  keyFilter: KeyEnum
  onClose: () => void;
  onChange: (value: string | number) => void;
}

const groupData = (data: DataProps[]): GroupedData => {
  return data.reduce<GroupedData>((groups, item) => {
    const letter = item.label.normalize('NFD')[0].toUpperCase();
    groups[letter] = groups[letter] || [];
    groups[letter].push(item);
    return groups;
  }, {});
};

const FilterModal: React.FC<FilterModalProps> = ({ title, isOpen, multiCheck, keyFilter, onClose, onChange }) => {
  const {
    filters,
    checkedItems,
    singleCheckedItem
  } = useFilterStore();

  const data = filters[keyFilter];

  const sortedData = useMemo(() => data.sort((a, b) => a.label.localeCompare(b.label)), [data]);
  const groupedData = useMemo(() => groupData(sortedData), [sortedData]);
  

  return isOpen && (
    <Modal closeModal={onClose}>
      <div className={styles.wrapper}>
        <ModalHeader title={title} onClose={onClose} />
        <ModalContent
          checkedItems={checkedItems}
          data={groupedData}
          handleCheckChange={onChange}
          multiCheck={multiCheck}
          singleCheckedItem={singleCheckedItem}
          keyFilter={keyFilter}
        />
        <ButtonBox isModal />
      </div>
    </Modal>
  );
};

export default FilterModal;