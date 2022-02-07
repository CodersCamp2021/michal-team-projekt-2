import styles from './SearchFilters.module.scss';

export function SearchFilters() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.headerText}>Filtry</p>
      </div>
      <p className={styles.partTitle}>Cena</p>
      <div className={styles.prices}>
        <label className={styles.labelPrice}>
          <span className={styles.labelName}>Cena min</span>
          <input className={styles.inputPrice} type="text"></input>
        </label>
        <label className={styles.labelPrice}>
          <span className={styles.labelName}>Cena max</span>
          <input className={styles.inputPrice} type="text"></input>
        </label>
      </div>
      <div className={styles.propertyType}>
        <p className={styles.partTitle}>Rodzaj nieruchomości</p>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>Hotel</span>
        </label>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>Hostel</span>
        </label>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>Apartament</span>
        </label>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>Dom</span>
        </label>
      </div>
      <div className={styles.languages}>
        <p className={styles.partTitle}>Język gospodarza</p>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>polski</span>
        </label>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>angielski</span>
        </label>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>niemiecki</span>
        </label>
        <label className={styles.labelCheckbox}>
          <input className={styles.input} type="checkbox" />
          <span className={styles.labelName}>hiszpański</span>
        </label>
      </div>
    </div>
  );
}
