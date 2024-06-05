import { Heading } from '@Inklua/components-library';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 80) {
          setMoveCount((oldMoveCount) => oldMoveCount + 1);
          return -10;
        }
        return Math.min(oldProgress + 20, 80);
      });
    }, 500);

    if (moveCount === 3) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [moveCount]);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <Image
          className={styles.images}
          src="/assets/disabled.png"
          alt="loading"
          style={{ left: `${progress}%` }}
          height={80}
          width={80}
        />
        <div className={styles.loadingText}>
          <Heading tag='h5'>Carregando vagas...</Heading>
        </div>
      </div>
    </div>
  );
};

export default Loading;