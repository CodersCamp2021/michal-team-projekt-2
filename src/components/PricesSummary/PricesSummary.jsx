import styles from './PricesSummary.module.scss';

export const PricesSummary = ({ title, price, totalPrice }) => {
  return (
    <div className={styles.pricesSummary}>
      <h3 className={styles.pricesSummaryTitle} data-testid="title">
        {title}
      </h3>
      <p className={styles.pricesSummaryPrice}>
        Doba: <span data-testid="price">{price} zł</span>
      </p>
      <p className={styles.pricesSummaryPrice}>
        Łacznie: <span data-testid="totalPrice">{totalPrice} zł</span>
      </p>
    </div>
  );
};
