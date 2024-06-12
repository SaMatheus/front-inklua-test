'use client'
import { Input, Paragraph } from '@Inklua/components-library';
import { useEffect, useState } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store';
import styles from './styles.module.scss';

interface SearchProps {
  label: string;
  placeholder: string;
  name?: string;
}

const Search = ({ label, placeholder, name }: SearchProps) =>  {
  const { positionInput, setPositionInput } = useFilterStore();
  const [data, setData] = useState('');

  useEffect(() => {
    !positionInput.length && setData('')
  }, [positionInput]);

  return (
    <div className={styles.wrapper}>
      <Paragraph weight={700}>{label}</Paragraph>
      <Input
        name={name || 'input'}
        onChange={({ target }) => setData(target.value)}
        placeholder={placeholder}
        onBlur={() => setPositionInput(data)}
        value={data}
      />
    </div>
  )
}

export default Search;