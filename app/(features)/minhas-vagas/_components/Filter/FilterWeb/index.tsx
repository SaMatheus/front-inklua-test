/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react';
import useGlobalMutation from 'app/(features)/minhas-vagas/_hook/useGlobalMutation';
import { useFilterStore, useJobsStore, useMutationStore, usePaginationStore } from 'app/(features)/minhas-vagas/_store';
import { KeyEnum } from 'app/(features)/minhas-vagas/_types';
import { buildingFetchParams } from 'app/(features)/minhas-vagas/_utils';
import ButtonBox from './ButtonBox';
import Search from './Search';
import styles from './styles.module.scss'
import LoadingPage from '../../LoadingPage';
import CheckBoxList from '../CheckBoxList'
import ChipBox from '../ChipBox';

const FilterWeb = () => {
  const [showChips, setShowChips] = useState(false)
  const {
    filters,
    reFetch,
    fetchData,
    cityFilter,
    workModelFilter,
    salaryFilter,
    positionInput,
    loading,
    setReFetch,
    setLoading,
    clearFilters
  } = useFilterStore();
  const { componentName, setComponentName } = useMutationStore();
  const { setJobRectTop } = useJobsStore();
  const { pagination } = usePaginationStore();

  const params = buildingFetchParams(positionInput, cityFilter, workModelFilter, salaryFilter, pagination.current)

  const mutation = useGlobalMutation({
    params,
    fn: [() => setShowChips(true)]
  });

  const handleClickFilter = () => {
    setComponentName('FilterWeb')
    mutation.mutate()
    typeof window !== 'undefined' && window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleClearFilter = () => {
    setComponentName('FilterWeb')
    clearFilters()
    mutation.mutate()
  }

  useEffect(() => {
    if (fetchData && reFetch && componentName === 'FilterWeb') {
      mutation.mutate();
      setReFetch(false);
      setJobRectTop(0);
    }
  }, [])

  useEffect(() => {
    if (!mutation.isPending && !reFetch && componentName === 'FilterWeb') return mutation.mutate()
  }, [pagination.current])

  useEffect(() => {
    (mutation.isPending) && setLoading(true)
  }, [mutation.isPending])

  return (
    <>
      {loading && <LoadingPage />}
      <div className={styles.wrapper}>
        {showChips && <ChipBox />}
        <Search
          label='Cargo/função'
          placeholder='Digite o cargo/função que deseja'
        />
        <CheckBoxList title='Local' keyFilter={KeyEnum.city} showMoreBtn onFilter={() => handleClickFilter()} />
        <CheckBoxList title='Modelo de trabalho' keyFilter={KeyEnum.workModel} />
        <CheckBoxList title='Pretensão salarial' keyFilter={KeyEnum.salary} viewQnt={filters.salary?.length} />
        <ButtonBox onFilter={() => handleClickFilter()} onClickSecondaryBtn={handleClearFilter} />
      </div> 
    </>
  )
}

export default FilterWeb