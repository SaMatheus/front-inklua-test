'use client'
import { Button, CheckboxCell, Paragraph } from '@Inklua/components-library';
import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { DataProps } from '../../_types/filter';
import FilterModal from '../Filter/FilterModal';

interface CheckBoxListProps {
  data: DataProps[] ;
  title: string;
  increment?: number;
  multiCheck?: boolean;
  viewQnt?: number;
  showMoreBtn?:boolean;
}

const CheckBoxList = ({
    data,
    title,
    multiCheck = false,
    viewQnt = 5,
    showMoreBtn = false
  }: CheckBoxListProps) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: number | string]: boolean }>({});
  const [singleCheckedItem, setSingleCheckedItem] = useState<string | number | null>(null);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);


  const handleCheckChange = (value: DataProps['value']): void => {
    if (data && !multiCheck) setSingleCheckedItem(prevValue => prevValue === value ? null : value);
    else setCheckedItems((prevState) => ({ ...prevState, [value]: !prevState[value] }));
  };

  const orderedData = useMemo(() => {
    return data?.sort((a, b) => (checkedItems[b.value] ? 1 : -1) - (checkedItems[a.value] ? 1 : -1)).slice(0, viewQnt);
  }, [data, checkedItems, viewQnt]);

  const renderCheckBoxList = () => (
    orderedData?.map((item, index) => (
      <div key={index} className={styles.checkboxInput}>
        <CheckboxCell
          label={item.label}
          checked={multiCheck ? checkedItems[item.value] : item.value === singleCheckedItem}
          onChange={() => handleCheckChange(item.value)}
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

  const selectionData = () => {
    return data?.reduce((acc, item) => {
      const obj = {
        ...acc,
        [item.value]: item.selected
      }
      return obj
    }, {} as { [key: number | string]: boolean });
  }

  useEffect(() => {
    if (data) {
      const initialCheckedItems = selectionData()
      initialCheckedItems && setCheckedItems(initialCheckedItems);
    }
  }, [])

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
          data={data}
          isOpen={openModal}
          onClose={() => setOpenModal(!openModal)}
          multiCheck={multiCheck}
        />
      }
    </div>
  );
}

export default CheckBoxList;