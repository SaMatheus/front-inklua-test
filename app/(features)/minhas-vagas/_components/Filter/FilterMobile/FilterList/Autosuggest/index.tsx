'use client'
import { ChangeEvent, useEffect, useState } from 'react';
import { FilterDataProps } from 'app/(features)/minhas-vagas/_types';
import instaDataFilter from 'app/(features)/minhas-vagas/_utils/instaDataFilter';
import styles from './styles.module.scss';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';

interface AutosuggestProps {
  options: FilterDataProps[];
}

const Autosuggest = ({ options: data }: AutosuggestProps) => {
  const [selectedOption, setSelectedOption] = useState<FilterDataProps['label']>();
  const [options, setOptions] = useState<FilterDataProps[]>();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>();
  const { setCityFilter } = useFilterStore();

  const handleInputChange = ({ target }:  ChangeEvent<HTMLInputElement>) => {
    setSelectedOption('');
    setInputValue(target.value);
    const filterCityOptions = instaDataFilter(data, target.value)
    setOptions(filterCityOptions);
  };

  const handleOptionClick = (option: FilterDataProps) => {
    setInputValue('')
    setSelectedOption(option.label);
    setCityFilter(option, true);
    setIsOpen(false)
  };

  useEffect(() => {
    inputValue === '' ? setIsOpen(false) : setIsOpen(true);
  }, [inputValue])

  return (
    <div className={styles.autosuggest}>
      <input
        type='text'
        className={`${styles.input} ${isOpen && styles.selectOpen}` }
        onChange={handleInputChange}
        placeholder={'Digite a cidade ou estado que procura'}
        value={inputValue || selectedOption}
      />
      {isOpen && (
        <div className={styles.options}>
          {options && options.map((option, index) => (
            <div key={index} onClick={() => handleOptionClick(option)} className={styles.option}>
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Autosuggest;