import { SearchForm } from '../../components/SearchForm/SearchForm';
import styles from './Homepage.module.scss';

export function Homepage() {
  return (
    <div className={styles.home}>
      <div className={styles.main}>
        <h1 className={styles.text}>
          Rezerwuj <span className={styles.tqColor}> pokoje</span>,<span className={styles.tqColor}> wille</span>,{' '}
          <br />
          <span className={styles.tqColor}>apartamenty</span> i wiele więcej na całym świecie
        </h1>
        <SearchForm />
      </div>
    </div>
  );
}
