import { useState, useEffect } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchFilters } from '../../components/SearchFilters/SearchFilters';
import { ObjectsList } from '../../components/ObjectsList/ObjectsList';
import { useSearchContext } from '../../context/searchContext';
import styles from './Offers.module.scss';

export function Offers() {
  const { offers, state: searchState } = useSearchContext();
  const [filteredOffers, setFilteredOffers] = useState([]);

  useEffect(() => {
    const newData = offers
      .filter((x) => x.host.languages.some((lang) => searchState.hostLanguages.includes(lang)))
      .filter((x) => x.price > parseInt(searchState.minPrice, 10) && x.price <= parseInt(searchState.maxPrice, 10));
    setFilteredOffers(newData);
  }, [searchState, offers]);

  return (
    <div className={styles.wrapper}>
      <SearchForm />
      <div className={styles.container}>
        <div className={styles.filters}>
          <SearchFilters />
        </div>
        <div className={styles.objectsList}>
          <ObjectsList objects={filteredOffers} />
        </div>
      </div>
    </div>
  );
}
