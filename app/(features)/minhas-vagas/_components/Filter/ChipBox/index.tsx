import { Chip, Icon, Paragraph } from '@Inklua/components-library'
import { useEffect, useState } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import { FilterDataProps } from 'app/(features)/minhas-vagas/_types/filter';
import styles from './styles.module.scss'

const ChipBox = () => {
  const [filtersData, setFiltersData] = useState<FilterDataProps[]>([])
  const [showAll, setShowAll] = useState(false)
  const {
    cityFilter,
    workModelFilter,
    salaryFilter,
    setCityFilter,
    setWorkModelFilter,
    setSalaryFilter
  } = useFilterStore();

  const handleRemoveCheckFilter = (item: FilterDataProps) => {
    if (cityFilter.includes(item)) setCityFilter(item)
    if (workModelFilter.includes(item)) setWorkModelFilter(item)
    if (salaryFilter.includes(item)) setSalaryFilter(item)
  }

  const removeChip = (label: string) => filtersData?.forEach((item) => item.label === label && handleRemoveCheckFilter(item))

  useEffect(() => {
    const data = [cityFilter, workModelFilter, salaryFilter].flat()
    setFiltersData(data)
  }, [cityFilter, workModelFilter, salaryFilter])

  const displayedChips = showAll ? filtersData : filtersData?.slice(0, 3)

  return (
    <div className={styles.chipBox}>
      <Paragraph weight={600}>Filtros ativos:</Paragraph>
      <div className={styles.chipList}>
      {
        displayedChips?.map((item: FilterDataProps) => (
          <Chip
            key={item.label}
            icon={<Icon name='icon-close' size='small'/>}
            text={item.label}
            palette='business'
            onClick={() => removeChip(item.label)}
          />
        ))
      }
      {filtersData?.length > 3 && (
        <Chip
          key="more"
          icon={<Icon name={showAll ? 'icon-minus-outline' : 'icon-plus'} size='small'/>}
          text={showAll ? `Esconder (${filtersData?.length - 3})` : `Mostrar (${filtersData?.length - 3})`}
          palette='business'
          onClick={() => setShowAll(!showAll)}
        />
      )}
      </div>
    </div>
  )
}

export default ChipBox