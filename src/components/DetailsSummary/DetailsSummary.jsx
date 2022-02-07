import styles from './DetailsSummary.module.scss';

export const DetailsSummary = ({ image, title, address, phone, status }) => {
  return (
    <div className={styles.detailsSummary}>
      <img src={image} className={styles.detailsSummaryImage} alt="" />
      <div>
        <h3 className={styles.detailsSummaryTitle}>{title}</h3>
        <p>{address}</p>
        <p>{phone}</p>
        <p className={styles.detailsSummaryStatus}>
          Status: <span>{status}</span>
        </p>
      </div>
    </div>
  );
};
