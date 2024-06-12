'use client'
import styles from './styles.module.scss';
import { useMobileStore } from '../../_store';

const LoadingPage = () => {
  const { isMobile } = useMobileStore();

  return (
    <div className={styles.loadingPage}>
      <div className={styles.spinner}></div>
      <h2>{isMobile ? 'Refinando sua busca' : 'Carregando...'}</h2>
      <p>{isMobile ? 'Estamos filtrando seus resultados' : 'Por favor, aguarde'}</p>
    </div>
  );
};

export default LoadingPage;