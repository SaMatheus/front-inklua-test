import { Input, Paragraph } from '@Inklua/components-library';
import styles from './styles.module.scss';

interface SearchProps {
  label: string;
  placeholder: string;
  onChange: () => void;
  error?: string;
  name?: string;
}

const Search = ({ label, placeholder, onChange, error, name }: SearchProps) => {
  return (
      <div className={styles.wrapper}>
        <Paragraph weight={700}>{label}</Paragraph>
        <Input
          error={error}
          name={name || 'input'}
          onChange={onChange}
          palette="institutional"
          placeholder={placeholder}
        />
      </div>
  )
};

export default Search;