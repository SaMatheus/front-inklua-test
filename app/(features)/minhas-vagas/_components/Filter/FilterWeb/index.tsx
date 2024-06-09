'use client'
import { useMutation, useQuery } from '@tanstack/react-query';
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
import FilterSkeleton from '../FilterSkeleton';

const FilterWeb = () => {
  const [showChips, setShowChips] = useState(false)
  const { setJobs } = useJobsStore()
  const {
    cityFilter,
    workModelFilter,
    salaryFilter,
    filters,
    positionInput,
    setFilters,
    setFetchData,
    clearFilters
  } = useFilterStore();

  const query = useQuery({
    queryKey: ['filter'],
    queryFn: () => getApiData()
  })

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

  useEffect(() => {
    if (!query.isPending && !query.error && query.data) {
      setFilters(query.data.filters)
    }
  }, [query.isPending, query.data, query.error, setFilters])

  return (
    <>
      {query.isPending && <FilterSkeleton />}
      {query.data && !query.isPending && !query.error && (
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
      )}
    </>
  )
}

export default FilterWeb