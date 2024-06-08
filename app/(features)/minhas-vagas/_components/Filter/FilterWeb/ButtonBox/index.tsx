'use client'
import { Button } from '@Inklua/components-library'
import styles from './styles.module.scss'

interface ButtonBoxProps {
  isModal?: boolean;
  onFilter?: () => void;
  onClearFilters?: () => void;
}

const ButtonBox = ({ isModal = false, onFilter, onClearFilters }: ButtonBoxProps) => {
  return (
    <div className={isModal ? styles.modalButtonsBox : styles.buttonsBox}>
      <Button onClick={onFilter} size={isModal ? 'medium' :'small'}>Filtrar</Button>
      <Button variant='ghost' onClick={onClearFilters}>{isModal ? 'Voltar' : 'Desfazer todos os filtros'}</Button>
    </div>
  )
}

export default ButtonBox