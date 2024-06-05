'use client'
import { Button } from '@Inklua/components-library'
import styles from './styles.module.scss'

interface ButtonBoxProps {
  isModal?: boolean;
}

const ButtonBox = ({ isModal = false }: ButtonBoxProps) => {
  return (
    <div className={isModal ? styles.modalButtonsBox : styles.buttonsBox}>
      <Button size={isModal ? 'medium' :'small'}>Filtrar</Button>
      <Button variant='ghost'>{isModal ? 'Voltar' : 'Desfazer todos os filtros'}</Button>
    </div>
  )
}

export default ButtonBox