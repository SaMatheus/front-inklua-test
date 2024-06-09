// Autosuggest.tsx
import { ChangeEvent, useEffect, useState } from 'react';
import { FilterDataProps } from 'app/(features)/minhas-vagas/_types/filter';
import instaDataFilter from 'app/(features)/minhas-vagas/_utils/instaDataFilter';
import styles from './styles.module.scss';

interface AutosuggestProps {
  options: FilterDataProps[];
  onOptionSelect: (options: FilterDataProps | undefined) => void;
}

const Autosuggest = ({ options, onOptionSelect }: AutosuggestProps) => {
  const [selectedOption, setSelectedOption] = useState<FilterDataProps['label']>();
  const [selectOptions, setSelectOptions] = useState<FilterDataProps[]>();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>();

  const handleInputChange = ({ target }:  ChangeEvent<HTMLInputElement>) => {
    setSelectedOption('');
    setInputValue(target.value);
    const filterCityOptions = instaDataFilter(options, target.value)
    setSelectOptions(filterCityOptions);
  };

  const handleOptionClick = (option: FilterDataProps) => {
    setSelectedOption(option.label);
    onOptionSelect(option);
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
        value={selectedOption || inputValue}
      />
      {isOpen && (
        <div className={styles.options}>
          {selectOptions && selectOptions.map((option, index) => (
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