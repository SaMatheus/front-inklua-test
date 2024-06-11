'use client'
import { Button, Icon } from '@Inklua/components-library'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useGlobalMutation from 'app/(features)/minhas-vagas/_hook/useGlobalMutation'
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData'
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore'
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore'
import { useMobileStore } from 'app/(features)/minhas-vagas/_store/MobileStore'
import { useMutationStore } from 'app/(features)/minhas-vagas/_store/MutationStore'
import { usePaginationStore } from 'app/(features)/minhas-vagas/_store/PaginationStore'
import { Filters } from 'app/(features)/minhas-vagas/_types'
import paramsBuilder from 'app/(features)/minhas-vagas/_utils/buildingFetchParams'
import ButtonBox from './ButtonBox'
import FilterList from './FilterList'
import Header from './Header'
import styles from './styles.module.scss'
import LoadingPage from '../../LoadingPage'
import ChipBox from '../ChipBox'

const FilterMobile = () => {
  const { isMobile } = useMobileStore();
  const [openFilter, setOpenFilter] = useState(false)
  const [showChips, setShowChips] = useState<boolean>(false)
  // const { setJobs } = useJobsStore()
  // const { setPagination } = usePaginationStore();
  const { componentName, setComponentName } = useMutationStore();
  const { pagination } = usePaginationStore();
  const { setJobRectTop } = useJobsStore();
  const {
    workModelFilter,
    salaryFilter,
    cityFilter,
    positionInput,
    reFetch,
    fetchData,
    loading,
    setReFetch,
    setLoading,
    setFetchData,
  } = useFilterStore();

  const params = paramsBuilder(positionInput, (String(cityFilter[0]?.value)), workModelFilter, salaryFilter, pagination.current)

  const mutation = useGlobalMutation({
    params,
    fn: [() => setShowChips(true), () => console.log('FilterMobile')]
  });

  const handleClickFilter = () => {
    setComponentName('FilterMobile')
    mutation.mutate()
    setOpenFilter(false)
  }

  const openedContent = () => (
    <>
      <Header onClick={() => setOpenFilter(false)} />
      <FilterList />
      <ButtonBox onFilter={() => handleClickFilter()} onCancelFilter={() => setOpenFilter(false)} />
    </>
  )

  // useEffect(() => {
  //   const storedFilters = localStorage.getItem('filters');
  //   if (isMobile && reFetch && storedFilters) {
  //     setFetchData(JSON.parse(storedFilters) as Filters);
  //     mutation.mutate();
  //     localStorage.removeItem('filters');
  //   }
  // }, [reFetch, isMobile])

  useEffect(() => {
    if (isMobile && fetchData && reFetch && componentName === 'FilterMobile') {
      mutation.mutate();
      setReFetch(false);
      setJobRectTop(0);
    }
  }, [])

  useEffect(() => {
    console.log(!mutation.isPending && !reFetch && componentName === 'FilterMobile')
    if (!mutation.isPending && !reFetch && componentName === 'FilterMobile') {
      return mutation.mutate()
    }
  }, [pagination.current, isMobile])

  useEffect(() => {
    (mutation.isPending) && setLoading(true)
  }, [mutation.isPending])

  return (
    <>
      {loading && <LoadingPage />}
      <div className={openFilter ? styles.wrapperOpened : styles.wrapperClosed}>
        {openFilter && openedContent()}
        {!openFilter && (
          <>
            <Button
              className={styles.openFilterBtn}
              icon={<Icon name='icon-options-2-outline'/>}
              onClick={() => setOpenFilter(true)}
              outlined
            >
              Filtrar Resultados
            </Button>
            {showChips && <ChipBox />}
          </>
        )}
      </div>
    </>
  )
}

export default FilterMobile