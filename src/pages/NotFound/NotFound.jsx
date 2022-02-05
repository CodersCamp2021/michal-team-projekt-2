import React from 'react';
import { LinkButton } from '../../components/LinkButton/LinkButton';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1 className={styles.boxText}>404</h1>
        <p className={styles.boxSubText}>sorry, page not found</p>
        <div className={styles.buttons}>
          <LinkButton path={-1} upper>
            go back
          </LinkButton>
          <LinkButton path="/" upper>
            go to home page
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
