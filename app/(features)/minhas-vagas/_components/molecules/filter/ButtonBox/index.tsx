'use client'
import { Button } from '@Inklua/components-library'
import styles from './styles.module.scss'

const ButtonBox = () => {
  return (
    <div className={styles.buttonsBox}>
      <Button size='small'>Filtrar</Button>
      <Button variant='ghost'>Desfazer todos os filtros</Button>
    </div>
  )
}

export default ButtonBox