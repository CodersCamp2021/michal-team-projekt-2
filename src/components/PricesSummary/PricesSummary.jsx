import styles from './PricesSummary.module.scss';

export const PricesSummary = ({ title, price, totalPrice }) => {
  return (
    <div className={styles.pricesSummary}>
      <h3 className={styles.pricesSummaryTitle}>{title}</h3>
      <p className={styles.pricesSummaryPrice}>
        Doba: <span>{price} zł</span>
      </p>
      <p className={styles.pricesSummaryPrice}>
        Łacznie: <span>{totalPrice} zł</span>
      </p>
    </div>
  );
};
