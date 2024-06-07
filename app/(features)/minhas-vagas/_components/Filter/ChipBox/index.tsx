import { Chip, Icon, Paragraph } from '@Inklua/components-library'
import { useEffect } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import styles from './styles.module.scss'

const ChipBox = () => {
  const { filters, checkedItems, singleCheckedItem } = useFilterStore();

  const parseCheckedItems = (data: { [key: number | string]: boolean }) => {
    const keyValuePairs = Object.entries(data);
    const validKeys = keyValuePairs
      .map(([key, value]) => !!value && key)
      .flat()
      .filter((item): item is string => typeof item === 'string');
  
    const splitKeyAtIndex = (index: number) => validKeys.map((key) => key.split('-')[index]);
  
    const keys = splitKeyAtIndex(0);
    const values = splitKeyAtIndex(1);
    const keyValuePairObjects = keys.map((key, index) => ({ [key]: values[index] }));
  
    return keyValuePairObjects;
  }
  
  useEffect(() => {
    const parsedKeys = parseCheckedItems(checkedItems);
    console.log(parsedKeys);
  }, [checkedItems]);

  return (
    <div className={styles.chipBox}>
      <Paragraph weight={600}>Filtros ativos:</Paragraph>
      <div className={styles.chipList}>
      <Chip
          icon={<Icon name='icon-close' size='small'/>}
          text='OLOKINHO MEEEEUUU'
          palette='business'
          onClick={() => console.log('click')}
        />
        <Chip
          icon={<Icon name='icon-close' size='small'/>}
          text='teste'
          palette='business'
          onClick={() => console.log('click')}
        />
        <Chip
          icon={<Icon name='icon-close' size='small'/>}
          text='a'
          palette='business'
          onClick={() => console.log('click')}
        />
        <Chip
          icon={<Icon name='icon-close' size='small'/>}
          text='Colococococo'
          palette='business'
          onClick={() => console.log('click')}
        />
      </div>
    </div>
  )
}

export default ChipBox