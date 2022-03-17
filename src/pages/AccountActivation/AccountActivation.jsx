import React, { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { LinkButton } from '../../components/LinkButton/LinkButton';
import { authService } from '../../services/auth';
import { Loading } from '../../components/Loading/Loading';
import styles from './AccountActivation.module.scss';

export const AccountActivation = () => {
  const [search] = useSearchParams();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const token = search.get('activeIt');
    if (token) {
      authService.activateUser(token).then(({ isActive }) => {
        setIsActive(isActive);
        setIsLoading(false);
      });
    }
  }, [search]);

  return isActive ? (
    <div className={styles.accountActivation}>
      <div className={styles.accountActivationContent}>
        <h1 className={styles.accountActivationTitle}>Gratulacje!</h1>
        <h2 className={styles.accountActivationSubtitle}> Twoje konto zostało aktywowane</h2>
        <div className={styles.accountActivationButtons}>
          <LinkButton path="/login" upper>
            zaloguj się
          </LinkButton>
          <LinkButton path="/" upper>
            Przejdź do strony głównej
          </LinkButton>
        </div>
      </div>
    </div>
  ) : isLoading ? (
    <Loading />
  ) : (
    <Navigate to="/" />
  );
};
