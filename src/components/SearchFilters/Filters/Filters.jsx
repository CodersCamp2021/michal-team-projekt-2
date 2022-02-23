import styles from './Filters.module.scss';

export function Filters(props) {
  return (
    <div className={styles.container}>
      <p className={styles.sectionTitle}>Cena</p>
      <div className={styles.prices}>
        <label className={styles.pricesLabel}>
          <span className={styles.pricesLabelName}>Cena min</span>
          <input
            className={styles.pricesLabelInput}
            type="number"
            onChange={props.handleValue}
            name="minPrice"
            min="1"
            value={props.minValue}
          ></input>
        </label>
        <label className={styles.pricesLabel}>
          <span className={styles.pricesLabelName}>Cena max</span>
          <input
            className={styles.pricesLabelInput}
            type="number"
            onChange={props.handleValue}
            name="maxPrice"
            min="1"
            value={props.maxValue}
          ></input>
        </label>
      </div>
      <div className={styles.propertyType}>
        <p className={styles.sectionTitle}>Rodzaj nieruchomości</p>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" name="Hotel" onChange={props.handleCheckboxType} />
          <span className={styles.propertyTypeLabelName}>Hotel</span>
        </label>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" name="Hostel" onChange={props.handleCheckboxType} />
          <span className={styles.propertyTypeLabelName}>Hostel</span>
        </label>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" name="Apartment" onChange={props.handleCheckboxType} />
          <span className={styles.propertyTypeLabelName}>Apartament</span>
        </label>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" name="House" onChange={props.handleCheckboxType} />
          <span className={styles.propertyTypeLabelName}>Dom</span>
        </label>
      </div>
      <div className={styles.languages}>
        <p className={styles.sectionTitle}>Język gospodarza</p>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" name="Polish" onChange={props.handleCheckboxLang} />
          <span className={styles.languagesLabelName}>polski</span>
        </label>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" name="English" onChange={props.handleCheckboxLang} />
          <span className={styles.languagesLabelName}>angielski</span>
        </label>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" name="German" onChange={props.handleCheckboxLang} />
          <span className={styles.languagesLabelName}>niemiecki</span>
        </label>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" name="Spanish" onChange={props.handleCheckboxLang} />
          <span className={styles.languagesLabelName}>hiszpański</span>
        </label>
      </div>
    </div>
  );
}
