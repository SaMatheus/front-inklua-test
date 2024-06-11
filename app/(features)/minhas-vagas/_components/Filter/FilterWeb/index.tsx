'use client'
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData';
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore';
import paramsBuilder from 'app/(features)/minhas-vagas/_utils/buildingFetchParams';
import ButtonBox from './ButtonBox';
import Search from './Search';
import styles from './styles.module.scss'
import { useFilterStore } from '../../../_store/FilterStore';
import CheckBoxList from '../CheckBoxList'
import ChipBox from '../ChipBox';
import { PaginationStore } from 'app/(features)/minhas-vagas/_store/PaginationStore';
import { Filters } from 'app/(features)/minhas-vagas/_types';
import LoadingPage from '../../LoadingPage';

const FilterWeb = () => {
  const [showChips, setShowChips] = useState(false)
  const { setJobs } = useJobsStore()
  const { setPagination } = PaginationStore();
  const {
    filters,
    reFetch,
    cityFilter,
    workModelFilter,
    salaryFilter,
    positionInput,
    loading,
    setLoading,
    setFetchData,
    clearFilters
  } = useFilterStore();

  const params = paramsBuilder(positionInput, cityFilter, workModelFilter, salaryFilter)

  const { isPending, mutate } = useMutation({
    mutationFn: () => getApiData(params),
    onSuccess: (data) => {
      setLoading(false)
      setShowChips(true)
      setFetchData(data.filters);
      setJobs(data.jobs)
      setPagination(data.pagination)
    },
    onError: (error) => {
      setShowChips(false)
      setLoading(false)
      console.log(error)
    }
  });

  useEffect(() => {
    const storedFilters = localStorage.getItem('filters');
    if (!!reFetch && !!storedFilters) {
      setFetchData(JSON.parse(storedFilters) as Filters);
      mutate();
      localStorage.removeItem('filters');
    }
  }, [reFetch])

  useEffect(() => {
    (isPending) && setLoading(true)
  }, [isPending])

  return (
    <>
      {loading && <LoadingPage />}
      <div className={styles.wrapper}>
        {showChips && <ChipBox />}
        <Search
          label='Cargo/função'
          placeholder='Digite o cargo/função que deseja'
        />
        <CheckBoxList title='Local' keyFilter='city' multiCheck showMoreBtn onFilter={() => mutate()} />
        <CheckBoxList title='Modelo de trabalho' keyFilter='workModel' multiCheck />
        <CheckBoxList title='Pretensão salarial' keyFilter='salary' viewQnt={filters.salary?.length} />
        <ButtonBox onFilter={() => mutate()} onClickSecondaryBtn={clearFilters} />
      </div> 
    </>
  )
}

export default FilterWeb