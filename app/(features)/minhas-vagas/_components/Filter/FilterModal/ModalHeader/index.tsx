/* eslint-disable react/display-name */
import { Heading, Icon, IconButton } from '@Inklua/components-library';
import styles from './styles.module.scss';

interface HeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: HeaderProps) => (
  <div className={styles.header}>
    <Heading tag='h6'>{title}</Heading>
    <IconButton icon={<Icon name='icon-close' />} onClick={onClose} />
  </div>
);

export default ModalHeader;