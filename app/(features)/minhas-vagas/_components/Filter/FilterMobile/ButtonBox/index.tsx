'use client'
import { Button } from '@Inklua/components-library';
import styles from './styles.module.scss';

interface HeaderProps {
  onCancelFilter: () => void;
  onFilter: () => void;
}

const ButtonBox = ({ onCancelFilter, onFilter }: HeaderProps) => (
  <div className={styles.buttonBox}>
    <Button onClick={onFilter}>Aplicar filtros</Button>
    <Button variant='ghost' onClick={onCancelFilter}>Cancelar</Button>
  </div>
)

export default ButtonBox;