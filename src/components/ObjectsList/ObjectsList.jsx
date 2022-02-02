import { polishPlurals } from 'polish-plurals';
import { Object } from './Object/Object';
import styles from './ObjectsList.module.scss';

export const ObjectsList = ({ objects }) => {
  const { objects: objectsArray, city, numOfObjects } = objects;
  return (
    <>
      <div className={styles.objectsList}>
        <h2 className={styles.objectsListTitle}>
          <span>{city}: </span>
          znaleziono {numOfObjects} {polishPlurals('obiekt', 'obiekty', 'obiektów', numOfObjects)}
        </h2>
        {objectsArray.map((object) => (
          <Object key={object.id} object={object} />
        ))}
      </div>
    </>
  );
};
