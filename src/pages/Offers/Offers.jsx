import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchFilters } from '../../components/SearchFilters/SearchFilters';
import { ObjectsList } from '../../components/ObjectsList/ObjectsList';
import styles from './Offers.module.scss';

export function Offers() {
  return (
    <div className={styles.wrapper}>
      <SearchForm saveData={() => {}} />
      <div className={styles.container}>
        <div className={styles.filters}>
          <SearchFilters />
        </div>
        <div className={styles.objectsList}>{/* <ObjectsList objects={}/> */}</div>
      </div>
    </div>
  );
}
