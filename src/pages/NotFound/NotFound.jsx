import React from 'react';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.boxText}>404</h1>
        <p className={styles.boxSubText}>Strona o podanym adresie nie istnieje</p>
        <div className={styles.buttons}>
          <LinkButton path={-1} upper>
            Wróć do poprzedniej strony
          </LinkButton>
          <LinkButton path="/" upper>
            Przejdź do strony głównej
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
