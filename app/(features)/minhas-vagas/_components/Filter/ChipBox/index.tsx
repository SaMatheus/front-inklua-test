'use client'
import { Chip, Icon, Paragraph } from '@Inklua/components-library'
import { useEffect, useState } from 'react';
import useGlobalMutation from 'app/(features)/minhas-vagas/_hook/useGlobalMutation';
import { useFilterStore, useMobileStore, useMutationStore } from 'app/(features)/minhas-vagas/_store';
import { FilterDataProps } from 'app/(features)/minhas-vagas/_types';
import { buildingFetchParams } from 'app/(features)/minhas-vagas/_utils';
import styles from './styles.module.scss'

const ChipBox = () => {
  const [filtersData, setFiltersData] = useState<(FilterDataProps | string)[]>([])
  const [showAll, setShowAll] = useState(false)
  const {
    cityFilter,
    workModelFilter,
    salaryFilter,
    positionInput,
    fetchData,
    cityInput,
    setLoading,
    setPositionInput,
    setCityFilter,
    setWorkModelFilter,
    removeSalaryFilter
  } = useFilterStore();
  const { isMobile } = useMobileStore()
  const { componentName, setComponentName } = useMutationStore();

  const params = buildingFetchParams(positionInput, (cityInput || cityFilter), workModelFilter, salaryFilter)

  const mutation = useGlobalMutation({
    params,
    fn: []
  });

  const removeChipStr = (str: string) => {
    const removeStr = filtersData.filter((item) => item !== str)
    setPositionInput('')
    return setFiltersData(removeStr)
  }

  const removeChipObj = (chipData: FilterDataProps) => {
    const hasDataInFilter = (store: FilterDataProps[] ) => store.find((item) => item.value === chipData.value)
    if (hasDataInFilter(cityFilter)) setCityFilter(chipData)
    if (hasDataInFilter(workModelFilter)) setWorkModelFilter(chipData)
    if (hasDataInFilter(salaryFilter)) removeSalaryFilter()
  }

  const removeChip = (chipData: FilterDataProps | string) => {
    setLoading(true)
    const isFilter = componentName === 'FilterWeb' || componentName === 'FilterMobile'
    if (typeof chipData === 'string') removeChipStr(chipData)
    if (typeof chipData !== 'string') removeChipObj(chipData)
    if (isFilter) {
      setComponentName(null)
      return mutation.mutate()
    }
  };

  useEffect(() => {
    const fetchedData = Object.values(fetchData).flat().filter((item) => item?.selected || typeof item === 'string')
    setFiltersData(fetchedData)
  }, [fetchData])

  const showChipQnt = isMobile ? 10 : 4
  const displayedChips = showAll ? filtersData : filtersData?.slice(0, showChipQnt)

  return !!(filtersData?.length > 0) && (
    <div className={styles.chipBox}>
      <Paragraph weight={600}>Filtros ativos:</Paragraph>
      <div className={styles.chipList}>
        {displayedChips?.map((item: FilterDataProps | string, index) => (
          <Chip
            key={index}
            icon={<Icon name='icon-close' size='small'/>}
            text={(typeof item !== 'string') ? item.label : item}
            palette='business'
            onClick={() => removeChip(item)}
          />
        ))}
        {filtersData?.length > showChipQnt && (
          <Chip
            key="more"
            icon={<Icon name={showAll ? 'icon-minus-outline' : 'icon-plus'} size='small'/>}
            text={showAll ? `Esconder (${filtersData?.length - showChipQnt})` : `Mostrar (${filtersData?.length - showChipQnt})`}
            palette='business'
            onClick={() => setShowAll(!showAll)}
          />
        )}
      </div>
    </div>
  )
}

export default ChipBox