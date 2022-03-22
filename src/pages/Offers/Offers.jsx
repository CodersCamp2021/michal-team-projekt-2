import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchFilters } from '../../components/SearchFilters/SearchFilters';
import { ObjectsList } from '../../components/ObjectsList/ObjectsList';
import { useSearchContext } from '../../context/searchContext';
import styles from './Offers.module.scss';

export function Offers() {
  const { offers } = useSearchContext();

  return (
    <div className={styles.wrapper}>
      <SearchForm />
      <div className={styles.container}>
        <div className={styles.filters}>
          <SearchFilters />
        </div>
        <div className={styles.objectsList}>
          <ObjectsList objects={offers} />
        </div>
      </div>
    </div>
  );
}
