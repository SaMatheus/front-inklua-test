/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button, Icon } from '@Inklua/components-library'
import { useEffect, useState } from 'react'
import useGlobalMutation from 'app/(features)/minhas-vagas/_hook/useGlobalMutation'
import {
  useFilterStore,
  useJobsStore,
  useMobileStore,
  useMutationStore,
  usePaginationStore
} from 'app/(features)/minhas-vagas/_store'
import { buildingFetchParams } from 'app/(features)/minhas-vagas/_utils'
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
  } = useFilterStore();

  const params = buildingFetchParams(positionInput, (String(cityFilter[0]?.value)), workModelFilter, salaryFilter, pagination.current)

  const mutation = useGlobalMutation({
    params,
    fn: [() => setShowChips(true)]
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

  useEffect(() => {
    if (isMobile && fetchData && reFetch && componentName === 'FilterMobile') {
      mutation.mutate();
      setReFetch(false);
      setJobRectTop(0);
    }
  }, [])

  useEffect(() => {
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