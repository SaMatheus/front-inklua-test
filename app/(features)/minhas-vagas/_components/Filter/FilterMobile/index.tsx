import { Button, Icon } from '@Inklua/components-library'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData'
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore'
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore'
import paramsBuilder from 'app/(features)/minhas-vagas/_utils/buildingFetchParams'
import ButtonBox from './ButtonBox'
import FilterList from './FilterList'
import Header from './Header'
import styles from './styles.module.scss'
import ChipBox from '../ChipBox'

const FilterMobile = () => {
  const [openFilter, setOpenFilter] = useState(false)
  const [showChips, setShowChips] = useState<boolean>(false)
  const { setJobs } = useJobsStore()
  const {
    workModelFilter,
    salaryFilter,
    cityFilter,
    positionInput,
    setFetchData,
  } = useFilterStore();

  const params = paramsBuilder(positionInput, (cityFilter && String(cityFilter[0]?.value)), workModelFilter, salaryFilter)

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

  const handleClickFilter = () => {
    mutation.mutate()
    return setOpenFilter(false)
  }

  const openedContent = () => (
    <>
      <Header onClick={() => setOpenFilter(false)} />
      <FilterList />
      <ButtonBox onFilter={() => handleClickFilter()} onCancelFilter={() => setOpenFilter(false)} />
    </>
  )

  return (
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
  )
}

export default FilterMobile