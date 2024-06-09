/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button, CheckboxCell, Paragraph } from '@Inklua/components-library';
import { useEffect, useMemo, useState } from 'react';
import { FilterDataProps, KeyEnum } from 'app/(features)/minhas-vagas/_types/filter';
import styles from './styles.module.scss';
import { useFilterStore } from '../../../_store/FilterStore';
import FilterModal from '../FilterWeb/FilterModal';

interface CheckBoxListProps {
  title: string;
  keyFilter: KeyEnum;
  increment?: number;
  viewQnt?: number;
  showMoreBtn?:boolean;
  isMobile?:boolean;
  onFilter?: () => void;
}

const CheckBoxList = ({
    title,
    keyFilter,
    viewQnt = 5,
    showMoreBtn = false,
    isMobile = false,
    onFilter
  }: CheckBoxListProps) => {
    const [showMore, setShowMore] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [filterData, setFilterData] = useState<FilterDataProps[]>([]);
    const {
      filters,
      cityFilter,
      workModelFilter,
      salaryFilter,
      setCityFilter,
      setWorkModelFilter,
      setSalaryFilter
    } = useFilterStore();

  const data = filters[keyFilter];

  const filterCheckMachine = {
    city: (item: FilterDataProps) => setCityFilter(item),
    workModel: (item: FilterDataProps) => setWorkModelFilter(item),
    salary: (item: FilterDataProps) => setSalaryFilter(item)
  }

  const filterDataMachine = {
    city: cityFilter,
    workModel: workModelFilter,
    salary: salaryFilter
  }

  const onCheck = (key: KeyEnum, item: FilterDataProps) => filterCheckMachine[key](item)

  const orderedData = useMemo(() => {
    if (keyFilter !== 'salary') data?.sort((a, b) => b.amount - a.amount);
    const findData = (item: FilterDataProps) => keyFilter !== 'salary' && filterData.find((filter) => filter.value === item.value)
    return data
      ?.sort((a, b) => (findData(b) ? 1 : -1) - (findData(a) ? 1 : -1))
      ?.slice(0, viewQnt);
  }, [data, viewQnt, onCheck]);

  useEffect(() => {
    setFilterData(filterDataMachine[keyFilter])
  }, [cityFilter, workModelFilter, salaryFilter])

  const renderCheckBoxList = () => (
    orderedData?.map((item, index) => {
      const isChecked = filterData && filterData?.find((filter) => filter.value === item.value)
      return (
        <div key={index} className={styles.checkboxInput}>
          <CheckboxCell
            label={item.label}
            checked={isChecked}
            onChange={() => onCheck(keyFilter, item)}
          />
          ({item.amount && item.amount})
        </div>
      )
    })
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
      {!isMobile && <Paragraph weight={700}>{title}</Paragraph>}
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
          keyFilter={keyFilter}
          onFilter={onFilter}
        />
      }
    </div>
  );
}

export default CheckBoxList;