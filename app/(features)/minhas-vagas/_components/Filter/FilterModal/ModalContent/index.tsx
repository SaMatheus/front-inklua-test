import { Input } from '@Inklua/components-library';
import styles from './styles.module.scss';
import { DataProps } from '../../../../_types/filter';
import ModalGroup from '../ModalGroup';

interface ModalContentProps {
  inputValue: string | undefined;
  onChange: React.Dispatch<React.SetStateAction<string | undefined>>;
  data: { [key: string]: DataProps[] };
  multiCheck?: boolean;
  checkedItems: { [key: number | string]: boolean };
  handleCheckChange: (value: DataProps['value']) => void;
  singleCheckedItem: string | number | null;
}

const ModalContent = ({
    inputValue,
    data,
    multiCheck,
    checkedItems,
    singleCheckedItem,
    handleCheckChange,
    onChange
  }: ModalContentProps) => {
  return (
    <div className={styles.content}>
      <Input
        name='search'
        value={inputValue}
        onChange={() => onChange}
        placeholder="Buscar..."
      />
      <div className={styles.list}>
        {Object.entries(data).map(([letter, items]) => (
          <>
            <ModalGroup
              key={letter}
              letter={letter}
              data={items}
              checkedItems={checkedItems}
              handleCheckChange={handleCheckChange}
              multiCheck={multiCheck}
              singleCheckedItem={singleCheckedItem}
            />
          </>
        ))}
      </div>
    </div>
  )
};

ModalContent.displayName = 'ModalContent';

export default ModalContent;