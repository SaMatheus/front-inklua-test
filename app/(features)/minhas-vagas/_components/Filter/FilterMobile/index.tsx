import { Button, Icon } from '@Inklua/components-library'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import getApiData from 'app/(features)/minhas-vagas/_providers/getApiData'
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore'
import { useJobsStore } from 'app/(features)/minhas-vagas/_store/JobsStore'
import { FilterDataProps } from 'app/(features)/minhas-vagas/_types/filter'
import paramsBuilder from 'app/(features)/minhas-vagas/_utils/buildingFetchParams'
import ButtonBox from './ButtonBox'
import FilterList from './FilterList'
import Header from './Header'
import styles from './styles.module.scss'
import ChipBox from '../ChipBox'

const FilterMobile = () => {
  const [openFilter, setOpenFilter] = useState(false)
  const [positionData, setPositionData] = useState<string>()
  const [cityData, setCityData] = useState<FilterDataProps>()
  const { setJobs } = useJobsStore()
  const {
    cityFilter,
    workModelFilter,
    salaryFilter,
    cityInput,
    setFilters,
    setPositionInput,
    setCityInput
  } = useFilterStore();

  const query = useQuery({
    queryKey: ['filter'],
    queryFn: () => getApiData()
  })

  const params = paramsBuilder(positionData, cityInput, workModelFilter, salaryFilter)

  console.log(params)

  const mutation = useMutation({
    mutationFn: () => getApiData(params),
    onSuccess: (data) => {
      setFilters(data.filters);
      setJobs(data.jobs)
    },
  });

  const handleClickFilter = () => {
    !!positionData && setPositionInput(positionData)
    !!cityData && setCityInput(String(cityData.value))
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
        onOptionSelect={setCityData}
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