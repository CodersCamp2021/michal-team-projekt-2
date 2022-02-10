import { useState, useEffect } from 'react';
import { SearchForm } from '../../components/SearchForm/SearchForm';
import { SearchFilters } from '../../components/SearchFilters/SearchFilters';
import { ObjectsList } from '../../components/ObjectsList/ObjectsList';
import styles from './Offers.module.scss';

const data = {
  city: 'Warszawa',
  numOfObjects: 2,
  objects: [
    {
      id: 1,
      title: 'Apartament z widokiem na morze',
      description: `
    Velit culpa ipsum irure duis incididunt duis occaecat consequat nulla excepteur duis non nisi ad. Elit
    Lorem reprehenderit ullamco laborum ex ex amet laborum tempor.`,
      localisation: {
        address: 'Łazienkowska 3, Warsaw, Poland',
        latitude: 52.22136,
        longitude: 21.04067,
      },
      price: 169,
      oldPrice: 239,
      image:
        'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
    {
      id: 2,
      title: 'Apartament z widokiem na morze',
      description: `
    Velit culpa ipsum irure duis incididunt duis occaecat consequat nulla excepteur duis non nisi ad. Elit
    Lorem reprehenderit ullamco laborum ex ex amet laborum tempor.`,
      localisation: {
        address: 'Łazienkowska 3, Warsaw, Poland',
        latitude: 52.22136,
        longitude: 21.04067,
      },
      price: 179,
      image:
        'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
  ],
};

export function Offers() {
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1);
  const [newObject, setNewObject] = useState();

  const handleValue = (e) => {
    if (e.target.id === 'maxPrice') {
      setMaxPrice(e.target.value);
    } else if (e.target.id === 'minPrice') {
      setMinPrice(e.target.value);
    }
  };

  const handleCheckbox = () => {};

  useEffect(() => {
    const filterPrice = (data) => {
      const newData = data.objects.filter((x) => x.price >= minPrice && x.price <= maxPrice);
      const createObject = {
        city: data.city,
        numOfObjects: newData.length,
        objects: newData,
      };
      setNewObject(createObject);
    };
    filterPrice(data);
  }, [minPrice, maxPrice]);

  const saveData = (data) => {
    console.log(data);
  };
  return (
    <div className={styles.wrapper}>
      <SearchForm saveData={saveData} />
      <div className={styles.container}>
        <div className={styles.filters}>
<SearchFilters handleValue={handleValue} handleCheckbox={handleCheckbox} />
        </div>
        <div className={styles.objectsList}>
          <ObjectsList objects={newObject} />
        </div>
      </div>
    </div>
  );
}
