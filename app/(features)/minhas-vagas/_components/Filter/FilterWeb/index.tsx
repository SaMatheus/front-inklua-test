'use client'
import { useEffect, useState } from 'react';
import useGlobalMutation from 'app/(features)/minhas-vagas/_hook/useGlobalMutation';
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore';
import { useMutationStore } from 'app/(features)/minhas-vagas/_store/MutationStore';
import { usePaginationStore } from 'app/(features)/minhas-vagas/_store/PaginationStore';
import { Filters } from 'app/(features)/minhas-vagas/_types';
import paramsBuilder from 'app/(features)/minhas-vagas/_utils/buildingFetchParams';
import ButtonBox from './ButtonBox';
import Search from './Search';
import styles from './styles.module.scss'
import { useFilterStore } from '../../../_store/FilterStore';
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
    setFetchData,
    clearFilters
  } = useFilterStore();
  const { componentName, setComponentName } = useMutationStore();
  const { setJobRectTop } = useJobsStore();
  const { pagination } = usePaginationStore();
  // const [params, setParams] = useState(paramsBuilder(positionInput, cityFilter, workModelFilter, salaryFilter, pagination.current))

  const params = paramsBuilder(positionInput, cityFilter, workModelFilter, salaryFilter, pagination.current)

  const mutation = useGlobalMutation({
    params,
    fn: [() => setShowChips(true), () => console.log('FilterWeb')]
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
    // const storedFilters = localStorage.getItem('filters');
    if (fetchData && reFetch && componentName === 'FilterWeb') {
      // params.page = pagination.current
      // setFetchData(JSON.parse(storedFilters) as Filters);
      // console.log('PRIMEIRO', JSON.parse(storedFilters) as Filters)
      // console.log('PRIMEIRO', fetchData)
      // console.log('SEGUNDO', reFetch)
      mutation.mutate();
      // localStorage.removeItem('filters');
      setReFetch(false);
      setJobRectTop(0);
    }
  }, [])

  useEffect(() => {
    if (!mutation.isPending && !reFetch && componentName === 'FilterWeb') {
      // setParams((prevParams) => ({...prevParams, page: pagination.current}))
      // params.page = pagination.current
      return mutation.mutate()
    }
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
        <CheckBoxList title='Local' keyFilter='city' multiCheck showMoreBtn onFilter={() => handleClickFilter()} />
        <CheckBoxList title='Modelo de trabalho' keyFilter='workModel' multiCheck />
        <CheckBoxList title='Pretensão salarial' keyFilter='salary' viewQnt={filters.salary?.length} />
        <ButtonBox onFilter={() => handleClickFilter()} onClickSecondaryBtn={handleClearFilter} />
      </div> 
    </>
  )
}

export default FilterWeb