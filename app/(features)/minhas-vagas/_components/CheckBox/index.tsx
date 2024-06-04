'use client'
import { Button, CheckboxCell, Paragraph } from '@Inklua/components-library';
import { useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';

interface DataProps {
  label: string;
  value: number | string;
  amount: number;
  selected: boolean;
}

interface CheckBoxProps {
  data: DataProps[];
  title: string;
  increment?: number;
  multiCheck?: boolean;
}

const CheckBox = ({ data, title, increment = 5, multiCheck = false }: CheckBoxProps) => {
  const [checkedItems, setCheckedItems] = useState({} as { [key: number | string]: boolean });
  const [singleCheckedItem, setSingleCheckedItem] = useState<string | number | null>(null);
  const [itemCount, setItemCount] = useState(5);
  const [showMore, setShowMore] = useState(true);

  const handleCheckChange = (value: DataProps['value']): void => {
    if (!multiCheck) setSingleCheckedItem(prevValue => prevValue === value ? null : value);
    else setCheckedItems((prevState) => ({ ...prevState, [value]: !prevState[value] }));
  };

  const sortedData = useMemo(() => {
    return data.sort((a, b) => {
      return (checkedItems[b.value] ? 1 : -1) - (checkedItems[a.value] ? 1 : -1) || b.amount - a.amount;
    });
  }, [data, checkedItems]);

  const slicedData = sortedData.slice(0, itemCount)

  const handleShowMore = () => {
    const canShowMore = sortedData.length > itemCount;
    const canShowLess = !showMore;

    if (canShowMore) setItemCount(itemCount + increment)
    if (sortedData.length <= itemCount + increment) setShowMore(false);
    if (canShowLess) {
        setItemCount(increment);
        setShowMore(true);
    }
  };

  const renderShowMoreButton = () => (
    <Button size='small' onClick={handleShowMore} outlined>
      {showMore ? 'Mostrar mais' : 'Mostrar menos'}
    </Button>
  )

  useEffect(() => {
    const initialCheckedItems = data.reduce((acc, item) => {
      return { ...acc, [item.value]: item.selected }
    }, {} as { [key: number | string]: boolean });

    setCheckedItems(initialCheckedItems);
  }, [])

  useEffect(() => {
    setItemCount(5);
    setShowMore(true);
  }, [data]);

  return (
    <div className={styles.checkboxWrapper}>
      <Paragraph weight={700}>{title}</Paragraph>
      <div className={styles.checkboxContent}>
        {
          slicedData.map((item, index) => (
            <div key={index} className={styles.checkboxInput}>
              <CheckboxCell
                label={item.label}
                checked={multiCheck ? checkedItems[item.value] : item.value === singleCheckedItem}
                onChange={() => handleCheckChange(item.value)}
              />
              ({item.amount})
            </div>
          ))
        }
        { multiCheck && renderShowMoreButton() }
      </div>
    </div>
  );
}

export default CheckBox;