"use client"

import { Button as ButtonCP } from "@Inklua/components-library";
import styles from './styles.module.scss';
import { Spinner } from "../Spinner";

export function Button(props: any) {
  const { children, loading, ...rest } = props;

  return (
    <ButtonCP {...rest}>
      {loading && (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      )}
      {children}
    </ButtonCP>
  )
}