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
      language: ['Polish', 'English'],
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
      language: ['Polish'],
      image:
        'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
  ],
};

export function Offers() {
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(400);
  const [langArr, setLangArr] = useState([]);
  const [newObject, setNewObject] = useState({
    city: data.city,
    numOfObjects: data.objects.length,
    objects: data.objects,
  });

  const handleCheckboxLang = (e) => {
    if (e.target.checked) {
      setLangArr((arr) => [...arr, `${e.target.name}`]);
    } else {
      setLangArr((arr) => arr.filter((item) => item !== e.target.name));
    }
  };

  const handleValue = (e) => {
    if (e.target.name === 'maxPrice') {
      setMaxPrice(e.target.value);
    } else if (e.target.name === 'minPrice') {
      setMinPrice(e.target.value);
    }
  };

  useEffect(() => {
    const filterPrice = (data) => {
      const newData = data.objects.filter((x) => x.price > parseInt(minPrice, 10) && x.price <= parseInt(maxPrice, 10));
      const createObject = {
        city: data.city,
        numOfObjects: newData.length,
        objects: newData,
      };
      setNewObject(createObject);
    };
    filterPrice(data);
    const filterLang = (data) => {
      const newData = data.objects.filter((x) => x.language.some((item) => langArr.includes(item)));
      const createObject = {
        city: data.city,
        numOfObjects: newData.length,
        objects: newData,
      };
      setNewObject(createObject);
    };
    if (langArr.length === 0) {
      setNewObject(data);
    } else {
      filterLang(data);
    }
  }, [minPrice, maxPrice, langArr]);

  return (
    <div className={styles.wrapper}>
      <SearchForm />
      <div className={styles.container}>
        <div className={styles.filters}>
          <SearchFilters
            handleValue={handleValue}
            handleCheckboxLang={handleCheckboxLang}
            minValue={minPrice}
            maxValue={maxPrice}
          />
        </div>
        <div className={styles.objectsList}>
          <ObjectsList objects={newObject} />
        </div>
      </div>
    </div>
  );
}
