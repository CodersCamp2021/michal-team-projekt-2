import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchContext, languages, accomodationTypes } from '../../../context/searchContext';
import styles from './Filters.module.scss';

export function Filters() {
  const { search, state: searchState } = useSearchContext();

  const { register, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      hostLanguages: searchState.hostLanguages,
      accomodationTypes: searchState.accomodationTypes,
      minPrice: searchState.minPrice,
      maxPrice: searchState.maxPrice,
    },
  });

  useEffect(() => {
    const subscription = watch((formData) => search(formData));
    return () => subscription.unsubscribe();
  }, [watch, search]);

  return (
    <div className={styles.container}>
      <p className={styles.sectionTitle}>Cena</p>
      <div className={styles.prices}>
        <label className={styles.pricesLabel}>
          <span className={styles.pricesLabelName}>Cena min</span>
          <input
            className={styles.pricesLabelInput}
            type="number"
            {...register('minPrice', { required: true })}
          ></input>
        </label>
        <label className={styles.pricesLabel}>
          <span className={styles.pricesLabelName}>Cena max</span>
          <input
            className={styles.pricesLabelInput}
            type="number"
            {...register('maxPrice', { required: true })}
          ></input>
        </label>
      </div>
      <div className={styles.propertyType}>
        <p className={styles.sectionTitle}>Rodzaj nieruchomości</p>
        {accomodationTypes.map((type) => (
          <label key={type} className={styles.propertyTypeLabel}>
            <input
              className={styles.input}
              type="checkbox"
              {...register('accomodationTypes', { required: true })}
              value={type}
            />
            <span className={styles.propertyTypeLabelName}>{type}</span>
          </label>
        ))}
      </div>
      <div className={styles.languages}>
        <p className={styles.sectionTitle}>Język gospodarza</p>
        {languages.map((language) => (
          <label key={language} className={styles.languagesLabel}>
            <input
              className={styles.input}
              type="checkbox"
              {...register('hostLanguages', { required: true })}
              value={language}
            />
            <span className={styles.languagesLabelName}>{language}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
