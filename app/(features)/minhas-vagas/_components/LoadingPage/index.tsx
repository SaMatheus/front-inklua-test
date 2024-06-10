import styles from './styles.module.scss';

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.spinner}></div>
      <h2>Carregando...</h2>
      <p>Por favor, aguarde</p>
    </div>
  );
};

export default LoadingPage;