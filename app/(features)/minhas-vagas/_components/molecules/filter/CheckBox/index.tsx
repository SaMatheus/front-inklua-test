'use client'
import { Button, CheckboxCell, Paragraph } from '@Inklua/components-library';
import { useEffect, useState } from 'react';
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
}

const CheckBox = ({ data, title, increment = 5 }: CheckBoxProps) => {
  const initialCHeckedItems = data.reduce((acc, item) => {
    return { ...acc, [item.value]: item.selected }
  }, {} as { [key: number | string]: boolean });

  const [checkedItems, setCheckedItems] = useState(initialCHeckedItems);
  const [itemCount, setItemCount] = useState(5);
  const [showMore, setShowMore] = useState(true);

  const handleCheckChange = (value: DataProps['value']): void => setCheckedItems(
    (prevState) => ({ ...prevState, [value]: !prevState[value] })
  );

  const sortByAmount = (a: DataProps, b: DataProps) => b.amount - a.amount;

  const sortByCheckedItems = (a: DataProps, b: DataProps) => (checkedItems[b.value] ? 1 : -1) - (checkedItems[a.value] ? 1 : -1);

  const sortedData = data.sort(sortByAmount).sort(sortByCheckedItems);

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

  const renderCheckboxCell = (item: DataProps, index: number): JSX.Element => (
    <div key={index} className={styles.checkboxInput}>
      <CheckboxCell
        label={item.label}
        checked={checkedItems[item.value]}
        onChange={() => handleCheckChange(item.value)}
      />
      ({item.amount})
    </div>
  );
  
  const renderShowMoreButton = () => (
    title === 'Local' && (
      <Button size='small' onClick={handleShowMore} outlined>
        {showMore ? 'Mostrar mais' : 'Mostrar menos'}
      </Button>
    )
  );

  useEffect(() => {
    setItemCount(5);
    setShowMore(true);
  }, [data]);

  return (
    <div className={styles.checkboxWrapper}>
      <Paragraph weight={700}>{title}</Paragraph>
      <div className={styles.checkboxContent}>
        {sortedData.slice(0, itemCount).map(renderCheckboxCell)}
        {renderShowMoreButton()}
      </div>
    </div>
  );
}

export default CheckBox;