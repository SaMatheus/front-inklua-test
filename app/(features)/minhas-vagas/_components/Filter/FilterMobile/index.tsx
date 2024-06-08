import { Button, Icon } from '@Inklua/components-library'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData'
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore'
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore'
import ButtonBox from './ButtonBox'
import FilterList from './FilterList'
import Header from './Header'
import styles from './styles.module.scss'
import ChipBox from '../ChipBox'

const FilterMobile = () => {
  const [openFilter, setOpenFilter] = useState(false)
  const [positionData, setPositionData] = useState<string>('')
  const [cityData, setCityData] = useState<string>('')
  const { setJobs } = useJobsStore()
  const {
    cityFilter,
    workModelFilter,
    salaryFilter,
    setFilters,
    setPositionInput,
    setCityInput
  } = useFilterStore();

  const query = useQuery({
    queryKey: ['filter'],
    queryFn: () => getApiData()
  })

  const buildParams = {
    page: 1,
    search: positionData,
    city: cityData,
    workModel: workModelFilter.map((workModel) => workModel.value).join(';'),
    salary: Number(salaryFilter[0]?.value),
  }

  const mutation = useMutation({
    mutationFn: () => getApiData(buildParams),
    onSuccess: (data) => {
      setFilters(data.filters);
      setJobs(data.jobs)
    },
  });

  const handleClickFilter = () => {
    setPositionInput(positionData)
    setCityInput(cityData)
    mutation.mutate()
    return setOpenFilter(false)
  }

  useEffect(() => {
    if (!query.isPending && !query.error && query.data) {
      setFilters(query.data.filters)
    }
  }, [query.isPending, query.data, query.error, setFilters])

  const openedContent = () => (
    <>
      <Header onClick={() => setOpenFilter(false)} />
      <FilterList
        setPositionData={setPositionData}
        setCityData={setCityData}
      />
      <ButtonBox onFilter={() => handleClickFilter()} onCancelFilter={() => setOpenFilter(false)} />
    </>
  )

  const renderChipValidation = !!cityFilter.length || !!workModelFilter.length || !!salaryFilter.length

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
          {renderChipValidation && <ChipBox />}
        </>
      )}
    </div>
  )
}

export default FilterMobile