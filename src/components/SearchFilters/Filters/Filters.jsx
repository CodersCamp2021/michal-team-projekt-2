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
          ></input>
        </label>
      </div>
      <div className={styles.propertyType}>
        <p className={styles.sectionTitle}>Rodzaj nieruchomości</p>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" id="typeHotel" onChange={props.handleCheckbox} />
          <span className={styles.propertyTypeLabelName}>Hotel</span>
        </label>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" id="typeHostel" onChange={props.handleCheckbox} />
          <span className={styles.propertyTypeLabelName}>Hostel</span>
        </label>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" id="typeApartment" onChange={props.handleCheckbox} />
          <span className={styles.propertyTypeLabelName}>Apartament</span>
        </label>
        <label className={styles.propertyTypeLabel}>
          <input className={styles.input} type="checkbox" id="typeHouse" onChange={props.handleCheckbox} />
          <span className={styles.propertyTypeLabelName}>Dom</span>
        </label>
      </div>
      <div className={styles.languages}>
        <p className={styles.sectionTitle}>Język gospodarza</p>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" id="langPolish" onChange={props.handleCheckbox} />
          <span className={styles.languagesLabelName}>polski</span>
        </label>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" id="langEnglish" onChange={props.handleCheckbox} />
          <span className={styles.languagesLabelName}>angielski</span>
        </label>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" id="langGerman" onChange={props.handleCheckbox} />
          <span className={styles.languagesLabelName}>niemiecki</span>
        </label>
        <label className={styles.languagesLabel}>
          <input className={styles.input} type="checkbox" id="langSpanish" onChange={props.handleCheckbox} />
          <span className={styles.languagesLabelName}>hiszpański</span>
        </label>
      </div>
    </div>
  );
}
