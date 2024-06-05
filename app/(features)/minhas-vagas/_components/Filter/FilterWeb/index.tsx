'use client'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { axios } from 'app/_lib/axios';
import styles from './styles.module.scss'
import { Filters } from '../../../_types/filter';
import ButtonBox from '../../ButtonBox';
import CheckBoxList from '../../CheckBoxList'
import Search from '../../Search';
import FilterSkeleton from '../FilterSkeleton';

const FilterWeb = () => {
  const [filterData, setFilterData] = useState<Filters>({} as Filters);

  const { data, isPending, error } = useQuery({
    queryKey: ['filter'],
    queryFn: () => axios.get<{ filters: Filters }>('/test-search').then((res) => res.data)
  });

  useEffect(() => {
    if (!isPending && data) setFilterData(data.filters)
  }, [isPending, data])

  return (
    <>
      {isPending && <FilterSkeleton />}
      {data && !isPending && !error && (
        <div className={styles.wrapper}>
          <Search
            label='Cargo/função'
            placeholder='Digite o cargo/função que deseja'
            onChange={({ target }) => console.log(target.value)}
          />
          <CheckBoxList title='Local' data={filterData.city} multiCheck showMoreBtn />
          <CheckBoxList title='Modelo de trabalho' data={filterData.workModel} multiCheck />
          <CheckBoxList title='Pretensão salarial' data={filterData.salary} viewQnt={filterData.salary?.length} />
          <ButtonBox />
        </div>
      )}
    </>
  )
}

export default FilterWeb