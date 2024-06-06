'use client'
import { Chip, Icon, Paragraph } from '@Inklua/components-library';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { axios } from 'app/_lib/axios';
import Search from './Search';
import styles from './styles.module.scss'
import { useFilterStore } from '../../../_store/FilterStore';
import ButtonBox from '../ButtonBox';
import CheckBoxList from '../CheckBoxList'
import FilterSkeleton from '../FilterSkeleton';

const FilterWeb = () => {
  const { filters, setFilters } = useFilterStore();

  const { data, isPending, error } = useQuery({
    queryKey: ['filter'],
    queryFn: () => axios.get('/test-search').then((res) => res.data)
  });

  useEffect(() => {
    if (!isPending && data) setFilters(data.filters)
  }, [isPending, data, setFilters])

  return (
    <>
      {isPending && <FilterSkeleton />}
      {data && !isPending && !error && (
        <div className={styles.wrapper}>
           <div className={styles.chipBox}>
              <Paragraph weight={600}>Filtros ativos:</Paragraph>
              <Chip 
                icon={<Icon name='icon-close' size='small'/>}
                text='teste'
                palette='business'
                onClick={() => console.log('click')}
              />
            </div>
          <Search
            label='Cargo/função'
            placeholder='Digite o cargo/função que deseja'
            onChange={({ target }) => console.log(target.value)}
          />
          <CheckBoxList title='Local' keyFilter='city' multiCheck showMoreBtn />
          <CheckBoxList title='Modelo de trabalho' keyFilter='workModel' multiCheck />
          <CheckBoxList title='Pretensão salarial' keyFilter='salary' viewQnt={filters.salary?.length} />
          <ButtonBox />
        </div> 
      )}
    </>
  )
}

export default FilterWeb