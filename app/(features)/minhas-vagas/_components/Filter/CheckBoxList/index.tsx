/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button, CheckboxCell, Paragraph } from '@Inklua/components-library';
import { useEffect, useMemo, useState } from 'react';
import { KeyEnum } from 'app/(features)/minhas-vagas/_types/filter';
import styles from './styles.module.scss';
import { useFilterStore } from '../../../_store/FilterStore';
import FilterModal from '../FilterWeb/FilterModal';

interface CheckBoxListProps {
  title: string;
  keyFilter: KeyEnum;
  increment?: number;
  multiCheck?: boolean;
  viewQnt?: number;
  showMoreBtn?:boolean;
}

const CheckBoxList = ({
    title,
    keyFilter,
    multiCheck = false,
    viewQnt = 5,
    showMoreBtn = false
  }: CheckBoxListProps) => {
    const [showMore, setShowMore] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const {
      filters,
      checkedItems,
      singleCheckedItem,
      setCheckedItems,
      setSingleCheckedItem
    } = useFilterStore();

  const data = filters[keyFilter];

  const onCheck = (value: string | number) => multiCheck
    ? setCheckedItems(value, keyFilter)
    : setSingleCheckedItem(value, keyFilter);

  const orderedData = useMemo(() => {
    if (keyFilter !== 'salary') data?.sort((a, b) => b.amount - a.amount);
    return data
      ?.sort((a, b) => (checkedItems[`${keyFilter}-${b.value}`] ? 1 : -1) - (checkedItems[`${keyFilter}-${a.value}`] ? 1 : -1))
      ?.slice(0, viewQnt);
  }, [data, viewQnt, onCheck]);

  const renderCheckBoxList = () => (
    orderedData?.map((item, index) => (
      <div key={index} className={styles.checkboxInput}>
        <CheckboxCell
          label={item.label}
          checked={multiCheck ? checkedItems[`${keyFilter}-${item.value}`] : `${keyFilter}-${item.value}` === singleCheckedItem}
          onChange={() => onCheck(item.value)}
        />
        ({item.amount && item.amount})
      </div>
    ))
  );

  const renderShowMoreButton = () => (
    <Button size='small' onClick={() => setOpenModal(!openModal)} outlined>
      {showMore ? 'Mostrar mais' : 'Mostrar menos'}
    </Button>
  )

  useEffect(() => {
    setShowMore(true);
  }, [data]);

  return (
    <div className={styles.checkboxWrapper}>
      <Paragraph weight={700}>{title}</Paragraph>
      <div className={styles.checkboxContent}>
        { data && renderCheckBoxList() }
        { showMoreBtn && renderShowMoreButton() }
      </div>
      {openModal &&
        <FilterModal
          title={title}
          isOpen={openModal}
          onClose={() => setOpenModal(!openModal)}
          onChange={onCheck}
          multiCheck={multiCheck}
          keyFilter={keyFilter}
        />
      }
    </div>
  );
}

export default CheckBoxList;