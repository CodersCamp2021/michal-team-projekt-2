import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchFilters } from '../../components/SearchFilters/SearchFilters';
import { ObjectsList } from '../../components/ObjectsList/ObjectsList';
import styles from './OffersPage.module.scss';

export function OffersPage() {
  return (
    <div className={styles.wrapper}>
      <SearchForm />
      <div>
        <SearchFilters />
        {/* <ObjectsList /> */}
      </div>
    </div>
  );
}
