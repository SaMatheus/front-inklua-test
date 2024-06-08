import { Icon, IconButton, Input, Paragraph } from '@Inklua/components-library';
import { useEffect, useState } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import styles from './styles.module.scss';

interface SearchProps {
  label: string;
  placeholder: string;
  error?: string;
  name?: string;
  // onClick: () => void;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
      <div className={styles.input}>
        <Input
          name={name || 'input'}
          onChange={({ target }) => setData(target.value)}
          placeholder={placeholder}
          value={data}
        />
        <IconButton
          style={{ paddingTop: '0.25rem' }}
          icon={<Icon name='icon-search' size='medium' color='#7DD1CC' />}
          onClick={() => setPositionInput(data)}
        />
      </div>
    </div>
  )
}

export default Search;