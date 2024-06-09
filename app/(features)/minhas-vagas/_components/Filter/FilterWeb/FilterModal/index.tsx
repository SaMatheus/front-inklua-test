import { Modal } from '@Inklua/components-library';
import { useEffect, useMemo, useState } from 'react';
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
  onFilter?: () => void;
}

const groupData = (data: FilterDataProps[]): GroupedData => {
  return data.reduce<GroupedData>((groups, item) => {
    const letter = item.label.normalize('NFD')[0].toUpperCase();
    groups[letter] = groups[letter] || [];
    groups[letter].push(item);
    return groups;
  }, {});
};

const FilterModal = ({ title, isOpen, keyFilter, onClose, onChange, onFilter }: FilterModalProps) => {
  const { filters } = useFilterStore();
  const [closeModal, setCloseModal] = useState<boolean>(false);

  const handleClickFilter = () => {
    setCloseModal(true);
    return !!onFilter && onFilter();
  }

  const data = filters[keyFilter];

  const sortedData = useMemo(() => data.sort((a, b) => a.label.localeCompare(b.label)), [data]);
  const groupedData = useMemo(() => groupData(sortedData), [sortedData]);

  useEffect(() => {
    closeModal && setCloseModal(false);
  }, []);

  return !closeModal && isOpen && (
    <Modal closeModal={() => onClose}>
      <div className={styles.wrapper}>
        <ModalHeader title={title} onClose={onClose} />
        <ModalContent
          data={groupedData}
          handleCheckChange={onChange}
          keyFilter={keyFilter}
        />
        <ButtonBox onFilter={() => handleClickFilter()} onClickSecondaryBtn={onClose} isModal />
      </div>
    </Modal>
  );
};

export default FilterModal;