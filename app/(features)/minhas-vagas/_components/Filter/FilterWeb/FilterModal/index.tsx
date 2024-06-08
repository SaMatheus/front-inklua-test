import { Modal } from '@Inklua/components-library';
import { useMemo } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import ModalContent from './ModalContent';
import ModalHeader from './ModalHeader';
import styles from './styles.module.scss';
import { FilterDataProps, KeyEnum } from '../../../../_types/filter';
import ButtonBox from '../ButtonBox';

type GroupedData = { [key: string]: FilterDataProps[] };

interface FilterModalProps {
  title: string;
  isOpen: boolean;
  keyFilter: KeyEnum
  onClose: () => void;
  onChange: (key: KeyEnum, item: FilterDataProps) => void;
}

const groupData = (data: FilterDataProps[]): GroupedData => {
  return data.reduce<GroupedData>((groups, item) => {
    const letter = item.label.normalize('NFD')[0].toUpperCase();
    groups[letter] = groups[letter] || [];
    groups[letter].push(item);
    return groups;
  }, {});
};

const FilterModal = ({ title, isOpen, keyFilter, onClose, onChange }: FilterModalProps) => {
  const { filters } = useFilterStore();

  const data = filters[keyFilter];

  const sortedData = useMemo(() => data.sort((a, b) => a.label.localeCompare(b.label)), [data]);
  const groupedData = useMemo(() => groupData(sortedData), [sortedData]);
  

  return isOpen && (
    <Modal closeModal={onClose}>
      <div className={styles.wrapper}>
        <ModalHeader title={title} onClose={onClose} />
        <ModalContent
          data={groupedData}
          handleCheckChange={onChange}
          keyFilter={keyFilter}
        />
        <ButtonBox onClick={onClose} isModal />
      </div>
    </Modal>
  );
};

export default FilterModal;