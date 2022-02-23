import { Link } from 'react-router-dom';
import { convertToSlug } from '../../../helpers/convertToSlug';
import styles from './Object.module.scss';

export const Object = ({ object }) => {
  const { image, title, description, price, oldPrice } = object;

  return (
    <div
      className={oldPrice ? `${styles.object} ${styles.objectAccent}` : styles.object}
      data-bargain={oldPrice && `Okazja dnia`}
    >
      <Link to={convertToSlug(title)} className={styles.objectLink}></Link>
      <img src={image} alt="" className={styles.objectImage} />
      <div className={styles.objectContainer}>
        <div>
          <h3 className={styles.objectTitle}>{title}</h3>
          <p className={styles.objectDesc}>{description}</p>
        </div>
        <p className={oldPrice ? `${styles.objectPrice} ${styles.objectPriceNew}` : styles.objectPrice}>
          {oldPrice && <span className={styles.objectPriceOld}>{oldPrice}zł</span>}
          {price} zł / noc
        </p>
      </div>
    </div>
  );
};
