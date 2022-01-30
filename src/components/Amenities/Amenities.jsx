import { BsCheck2 } from 'react-icons/bs';
import styles from './Amenities.module.scss';

const generateAmenitiesClass = (length) => {
  if (length === 1) return `${styles.amenities}`;
  if (length === 2) return `${styles.amenities} ${styles.amenitiesTwoColumns}`;
  if (length > 2) return `${styles.amenities} ${styles.amenitiesThreeColumns}`;
};

export const Amenities = ({ amenities }) => {
  const amenitiesLenght = amenities.length;
  const styleClass = generateAmenitiesClass(amenitiesLenght);

  return (
    <ul className={styleClass}>
      {amenities.map((amenitie) => (
        <li className={styles.amenitie} key={amenitie}>
          {<BsCheck2 />}
          {amenitie}
        </li>
      ))}
    </ul>
  );
};
