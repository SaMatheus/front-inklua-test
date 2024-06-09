import { Chip, Icon, Paragraph } from '@Inklua/components-library'
import { useEffect, useState } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import { useMobileStore } from 'app/(features)/minhas-vagas/_store/MobileStore';
import { FilterDataProps } from 'app/(features)/minhas-vagas/_types/filter';
import styles from './styles.module.scss'

const ChipBox = () => {
  const [filtersData, setFiltersData] = useState<(FilterDataProps | string)[]>([])
  const [showAll, setShowAll] = useState(false)
  const {
    cityFilter,
    workModelFilter,
    salaryFilter,
    positionInput,
    cityInput,
    setPositionInput,
    setCityInput,
    setCityFilter,
    setWorkModelFilter,
    setSalaryFilter
  } = useFilterStore();
  const { isMobile } = useMobileStore()

  const handleRemoveCheckFilter = (item: FilterDataProps | string) => {
    if (typeof item === 'string') return
    if (cityFilter.includes(item)) setCityFilter(item)
    if (workModelFilter.includes(item)) setWorkModelFilter(item)
    if (salaryFilter.includes(item)) setSalaryFilter(item)
  }

  const removeChipObj = (obj: FilterDataProps | string) => {
    if (typeof obj === 'string') return obj === positionInput ? setPositionInput('') : setCityInput('')
    return filtersData.forEach((item) => {
      if (typeof item !== 'string' && item.label === obj.label) {
        handleRemoveCheckFilter(item);
      }
    })
  };

  useEffect(() => {
    const data = [...cityFilter, ...workModelFilter, ...salaryFilter];
    const addInputToData = (input: { label: string } | string) => {
      const inputValue = typeof input === 'string' ? input : input.label;
      if (inputValue.trim() !== '') {
        data.push(input as FilterDataProps);
      }
    };

    addInputToData(positionInput);
    addInputToData(cityInput);

    setFiltersData(data);
  }, [positionInput, cityInput, cityFilter, workModelFilter, salaryFilter])

  const showChipQnt = isMobile ? 2 : 3
  const displayedChips = showAll ? filtersData : filtersData?.slice(0, showChipQnt)

  return (
    <div className={styles.chipBox}>
      <Paragraph weight={600}>Filtros ativos:</Paragraph>
      <div className={styles.chipList}>
      {displayedChips?.map((item: FilterDataProps | string, index) => (
        <Chip
          key={index}
          icon={<Icon name='icon-close' size='small'/>}
          text={(typeof item !== 'string') ? item.label : item}
          palette='business'
          onClick={() => removeChipObj(item)}
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