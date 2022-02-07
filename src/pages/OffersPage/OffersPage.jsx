import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchFilters } from '../../components/SearchFilters/SearchFilters';
// import { ObjectsList } from '../../components/ObjectsList/ObjectsList';
// import { Object } from '../../components/ObjectsList/Object/Object';
import styles from './OffersPage.module.scss';

export function OffersPage() {
  return (
    <div className={styles.wrapper}>
      <SearchForm saveData={() => {}} />
      <div className={styles.container}>
        <div className={styles.filters}>
          <SearchFilters />
        </div>
        <div className={styles.objectsList}>test</div>
        {/* <ObjectList /> */}
      </div>
    </div>
  );
}
