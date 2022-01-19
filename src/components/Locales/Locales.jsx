import { Select } from '../Select/Select';
import styles from './Locales.module.scss';

export const Locales = () => {
  return (
    <div className={styles.locales}>
      <Select options={['PLN', 'EUR']} />;
      <Select options={['🇵🇱', '🇩🇪']} />
    </div>
  );
};
