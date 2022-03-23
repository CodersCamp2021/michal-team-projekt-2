import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';

import styles from './Object.module.scss';

export const Object = ({ object }) => {
  const ResponsiveEllipsis = responsiveHOC()(LinesEllipsis);
  const { image, title, information, price, oldPrice } = object;

  return (
    <div
      className={oldPrice ? `${styles.object} ${styles.objectAccent}` : styles.object}
      data-bargain={oldPrice && `Okazja dnia`}
    >
      <Link to={object._id} className={styles.objectLink}></Link>
      <img src={image} alt="" className={styles.objectImage} />
      <div className={styles.objectContainer}>
        <div>
          <h3 className={styles.objectTitle}>{title}</h3>
          <ResponsiveEllipsis
            text={information}
            maxLine="4"
            ellipsis="..."
            trimRight
            basedOn="letters"
            className={styles.objectDesc}
          />
        </div>
        <p className={oldPrice ? `${styles.objectPrice} ${styles.objectPriceNew}` : styles.objectPrice}>
          {oldPrice && <span className={styles.objectPriceOld}>{oldPrice}zł</span>}
          {price} zł / noc
        </p>
      </div>
    </div>
  );
};
