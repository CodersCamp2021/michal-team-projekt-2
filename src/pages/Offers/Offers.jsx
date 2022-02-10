import { useState, useEffect } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchFilters } from '../../components/SearchFilters/SearchFilters';
import { ObjectsList } from '../../components/ObjectsList/ObjectsList';
import { useSearchContext } from '../../context/searchContext';
import styles from './Offers.module.scss';

export function Offers() {
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(400);
  const { offers } = useSearchContext();
  const [filteredOffers, setFilteredOffers] = useState([]);

  const handleValue = (e) => {
    if (e.target.name === 'maxPrice') {
      setMaxPrice(e.target.value);
    } else if (e.target.name === 'minPrice') {
      setMinPrice(e.target.value);
    }
  };

  const handleCheckbox = () => {};

  useEffect(() => {
    const newData = offers.filter((x) => x.price > parseInt(minPrice, 10) && x.price <= parseInt(maxPrice, 10));
    setFilteredOffers(newData);
  }, [minPrice, maxPrice, offers]);

  return (
    <div className={styles.wrapper}>
      <SearchForm />
      <div className={styles.container}>
        <div className={styles.filters}>
          <SearchFilters
            handleValue={handleValue}
            handleCheckbox={handleCheckbox}
            minValue={minPrice}
            maxValue={maxPrice}
          />
        </div>
        <div className={styles.objectsList}>
          <ObjectsList objects={filteredOffers} />
        </div>
      </div>
    </div>
  );
}
