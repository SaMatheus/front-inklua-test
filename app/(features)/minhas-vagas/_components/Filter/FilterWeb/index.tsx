'use client'
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData';
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore';
import paramsBuilder from 'app/(features)/minhas-vagas/_utils/buildingFetchParams';
import ButtonBox from './ButtonBox';
import Search from './Search';
import styles from './styles.module.scss'
import { useFilterStore } from '../../../_store/FilterStore';
import CheckBoxList from '../CheckBoxList'
import ChipBox from '../ChipBox';
import FilterSkeleton from '../FilterSkeleton';
import LoadingPage from '../../Loading';

const FilterWeb = () => {
  const [showChips, setShowChips] = useState(false)
  const { setJobs } = useJobsStore()
  const {
    filters,
    cityFilter,
    workModelFilter,
    salaryFilter,
    positionInput,
    setFetchData,
    clearFilters
  } = useFilterStore();

  const params = paramsBuilder(positionInput, cityFilter, workModelFilter, salaryFilter)

  const mutation = useMutation({
    mutationFn: () => getApiData(params),
    onSuccess: (data) => {
      setShowChips(true)
      setFetchData(data.filters);
      setJobs(data.jobs)
    },
    onError: (error) => {
      setShowChips(false)
      console.log(error)
    }
  });

  return (
    <>
      {mutation.isPending && <LoadingPage />}
      <div className={styles.wrapper}>
        {showChips && <ChipBox />}
        <Search
          label='Cargo/função'
          placeholder='Digite o cargo/função que deseja'
        />
        <CheckBoxList title='Local' keyFilter='city' multiCheck showMoreBtn onFilter={() => mutation.mutate()} />
        <CheckBoxList title='Modelo de trabalho' keyFilter='workModel' multiCheck />
        <CheckBoxList title='Pretensão salarial' keyFilter='salary' viewQnt={filters.salary?.length} />
        <ButtonBox onFilter={() => mutation.mutate()} onClickSecondaryBtn={clearFilters} />
      </div> 
    </>
  )
}

export default FilterWeb