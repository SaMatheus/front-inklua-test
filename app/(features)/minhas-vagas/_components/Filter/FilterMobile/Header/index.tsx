'use client'
import { Heading, Icon, IconButton } from '@Inklua/components-library';
import styles from './styles.module.scss';

interface HeaderProps {
  onClick: () => void;
}

const Header = ({ onClick }: HeaderProps) => (
  <div className={styles.header}>
    <Heading tag='h6'> Selecione as opções</Heading>
    <IconButton icon={<Icon name='icon-close' size='large' />} onClick={onClick} />
  </div>
)

export default Header;