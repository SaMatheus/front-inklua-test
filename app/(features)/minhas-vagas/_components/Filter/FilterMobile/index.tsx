'use client'
import { Button, Icon } from '@Inklua/components-library'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData'
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore'
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore'
import paramsBuilder from 'app/(features)/minhas-vagas/_utils/buildingFetchParams'
import ButtonBox from './ButtonBox'
import FilterList from './FilterList'
import Header from './Header'
import styles from './styles.module.scss'
import ChipBox from '../ChipBox'
import { PaginationStore } from 'app/(features)/minhas-vagas/_store/PaginationStore'
import LoadingPage from '../../LoadingPage'
import { Filters } from 'app/(features)/minhas-vagas/_types'
import { useMobileStore } from 'app/(features)/minhas-vagas/_store/MobileStore'

const FilterMobile = () => {
  const { isMobile } = useMobileStore();
  const [openFilter, setOpenFilter] = useState(false)
  const [showChips, setShowChips] = useState<boolean>(false)
  const { setJobs } = useJobsStore()
  const { setPagination } = PaginationStore();
  const {
    workModelFilter,
    salaryFilter,
    cityFilter,
    positionInput,
    reFetch,
    loading,
    setLoading,
    setFetchData,
  } = useFilterStore();

  const params = paramsBuilder(positionInput, (String(cityFilter[0]?.value)), workModelFilter, salaryFilter)

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
      setLoading(false)
      setShowChips(false)
      console.log(error)
    }
  });

  const handleClickFilter = () => {
    console.log(params)
    mutate()
    return setOpenFilter(false)
  }

  const openedContent = () => (
    <>
      <Header onClick={() => setOpenFilter(false)} />
      <FilterList />
      <ButtonBox onFilter={() => handleClickFilter()} onCancelFilter={() => setOpenFilter(false)} />
    </>
  )

  useEffect(() => {
    const storedFilters = localStorage.getItem('filters');
    if (isMobile && reFetch && storedFilters) {
      setFetchData(JSON.parse(storedFilters) as Filters);
      mutate();
      localStorage.removeItem('filters');
    }
  }, [reFetch, isMobile])

  useEffect(() => {
    (isPending) && setLoading(true)
  }, [isPending])

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