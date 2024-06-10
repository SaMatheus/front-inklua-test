import { Accordion, Heading, Icon, Input, Select } from '@Inklua/components-library';
import { useEffect, useState } from 'react';
import { useFilterStore } from 'app/(features)/minhas-vagas/_store/FilterStore';
import { KeyEnum } from 'app/(features)/minhas-vagas/_types/filter';
import Autosuggest from './Autosuggest';
import styles from './styles.module.scss';
import CheckBoxList from '../../CheckBoxList';

interface parsedSalary {
  label: string;
  value: string | number;
}

const FilterList = () => {
  const {
    filters,
    salaryFilter,
    setSalaryFilter,
    setPositionInput
  } = useFilterStore();
  const [salaryData, setSalaryData] = useState<parsedSalary[]>()
  const [selected, setSelected] = useState<string | number>('' as string | number)
  const [positionData, setPositionData] = useState<string>()

  const handleSalarySelect = (salary: { label: string, value: number | string }) => {
    const salarySelected = filters.salary.find(item => item.value === salary.value)
    setSelected(salary.label)
    return salarySelected && setSalaryFilter(salarySelected)
  }
 
  useEffect(() => {
    const parsedSalary = filters.salary.map((obj) => ({ label: obj.label, value: obj.value }));
    parsedSalary && setSalaryData(parsedSalary)
  }, [filters.salary, salaryFilter])

  return salaryData && (
    <div className={styles.content}>
      <Accordion
        expandIcon={<Icon name='icon-arrow-ios-downward' />}
        title={<Heading tag='h6'>Cargo ou palavra chave</Heading>}
      >
        <Input
          name='input'
          placeholder='Digite o cargo/função que deseja'
          onChange={({ target }) => setPositionData(target.value)}
          value={positionData}
          onBlur={() => positionData && setPositionInput(positionData)}
        />
      </Accordion>
      <Accordion
        expandIcon={<Icon name='icon-arrow-ios-downward' />}
        title={<Heading tag='h6'>Local</Heading>}
      >
        <Autosuggest options={filters.city} />
      </Accordion>
      <Accordion
        expandIcon={<Icon name='icon-arrow-ios-downward' />}
        title={<Heading tag='h6'>Modelo de trabalho</Heading>}
      >
        <CheckBoxList title='Modelo de trabalho' keyFilter={KeyEnum.workModel} isMobile />
      </Accordion>
      <Accordion
        expandIcon={<Icon name='icon-arrow-ios-downward' />}
        title={<Heading tag='h6'>Salário</Heading>}
      >
        <Select
          options={salaryData}
          handleOption={(e) => handleSalarySelect(e)}
          selectedOption={selected || 'Selecione o salário que deseja'}
        />
      </Accordion>
    </div>
  ) 
}

export default FilterList;