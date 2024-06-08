'use client'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData';
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore';
import ButtonBox from './ButtonBox';
import Search from './Search';
import styles from './styles.module.scss'
import { useFilterStore } from '../../../_store/FilterStore';
import CheckBoxList from '../CheckBoxList'
import ChipBox from '../ChipBox';
import FilterSkeleton from '../FilterSkeleton';

const FilterWeb = () => {
  const { setJobs } = useJobsStore()
  const {
    cityFilter,
    workModelFilter,
    salaryFilter,
    filters,
    positionInput,
    cityInput,
    setFilters,
    clearFilters
  } = useFilterStore();

  const buildParams = {
    page: 1,
    search: positionInput,
    city: cityFilter.map((city) => city.value).join(';'),
    workModel: workModelFilter.map((workModel) => workModel.value).join(';'),
    salary: Number(salaryFilter[0]?.value),
  }

  const query = useQuery({
    queryKey: ['filter'],
    queryFn: () => getApiData()
  })

  const mutation = useMutation({
    mutationFn: () => getApiData(buildParams),
    onSuccess: (data) => {
      setFilters(data.filters);
      setJobs(data.jobs)
    },
  });

  const renderChipValidation = !!cityFilter.length || !!workModelFilter.length || !!salaryFilter.length || !!positionInput || !!cityInput

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
          {renderChipValidation && <ChipBox />}
          <Search
            label='Cargo/função'
            placeholder='Digite o cargo/função que deseja'
          />
          <CheckBoxList title='Local' keyFilter='city' multiCheck showMoreBtn />
          <CheckBoxList title='Modelo de trabalho' keyFilter='workModel' multiCheck />
          <CheckBoxList title='Pretensão salarial' keyFilter='salary' viewQnt={filters.salary?.length} />
          <ButtonBox onFilter={() => mutation.mutate()} onClearFilters={clearFilters} />
        </div> 
      )}
    </>
  )
}

export default FilterWeb