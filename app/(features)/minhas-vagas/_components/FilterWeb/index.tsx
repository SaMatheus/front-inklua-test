'use client'
import styles from './styles.module.scss'
import ButtonBox from '../ButtonBox';
import CheckBox from '../CheckBox'
import Search from '../Search';

const FilterWeb = () => {
  const locationMock = [
    {
      label: 'São Paulo - SP',
      value: 1,
      amount: 2000,
      selected: false
    },
    {
      label: 'Rio de Janeiro - RJ',
      value: 2,
      amount: 1300,
      selected: false
    },
    {
      label: 'Campinas - SP',
      value: 3,
      amount: 400,
      selected: true
    },
    {
      label: 'São Caetano - SP',
      value: 4,
      amount: 35,
      selected: false
    },
    {
      label: 'Belfor Roxo - RJ',
      value: 5,
      amount: 4562341,
      selected: false
    },
    {
      label: 'Boituva - SP',
      value: 6,
      amount: 1,
      selected: false
    },
    {
      label: 'Santos - SP',
      value: 7,
      amount: 2000,
      selected: false
    },
    {
      label: 'Buzios - RJ',
      value: 8,
      amount: 1300,
      selected: false
    },
    {
      label: 'Osasco - SP',
      value: 9,
      amount: 400,
      selected: true
    },
    {
      label: 'São Bernardo - SP',
      value: 10,
      amount: 35,
      selected: false
    },
    {
      label: 'Paraty - RJ',
      value: 11,
      amount: 4562341,
      selected: false
    },
    {
      label: 'Torre de pedra - SP',
      value: 12,
      amount: 1,
      selected: true
    },
  ]

  const workModelMock = [
    {
        label: 'Vagas presenciais',
        value: 'local',
        amount: 5,
        selected: true
    },
    {
        label: 'Vagas remotas (Home Office)',
        value: 'remote',
        amount: 43987,
        selected: false
    },
    {
        label: 'Vagas híbridas',
        value: 'hybrid',
        amount: 123,
        selected: false
    }
  ]
  
  const salaryMock = [
    {
      label: "Até R$ 1.000,00",
      value: 1,
      amount: 2000,
      selected: false
    },
    {
      label: "Até R$ 2.000,00",
      value: 2,
      amount: 2000,
      selected: false
    },
    {
      label: "Até R$ 3.000,00",
      value: 3,
      amount: 2000,
      selected: false
    },
    {
      label: "Até R$ 5.000,00",
      value: 4,
      amount: 2000,
      selected: false
    },
    {
      label: "Até R$ 10.000,00",
      value: 5,
      amount: 2000,
      selected: false
    },
    {
      label: "Acima de R$ 10.000,00",
      value: 6,
      amount: 2000,
      selected: false
    },
  ]

  return (
    <div className={styles.wrapper}>
      <Search
        label='Cargo/função'
        placeholder='Digite o cargo/função que deseja'
        onChange={() => console.log}
      />
      <CheckBox title='Local' data={locationMock} multiCheck />
      <CheckBox title='Modelo de trabalho' data={workModelMock} />
      <CheckBox title='Pretensão salarial' data={salaryMock} />
      <ButtonBox />
    </div>
  )
}

export default FilterWeb