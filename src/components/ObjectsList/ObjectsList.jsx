import { polishPlurals } from 'polish-plurals';
import { useSearchContext } from '../../context/searchContext';
import { Loading } from '../Loading/Loading';
import { Object } from './Object/Object';
import styles from './ObjectsList.module.scss';

export const ObjectsList = ({ objects }) => {
  const {
    state: { localisation },
  } = useSearchContext();
  return (
    <>
      {!objects ? (
        <Loading />
      ) : (
        <div className={styles.objectsList}>
          <h2 className={styles.objectsListTitle}>
            <span>{localisation}: </span>
            znaleziono {objects.length} {polishPlurals('obiekt', 'obiekty', 'obiektów', objects.length)}
          </h2>
          {objects.map((object) => (
            <Object key={object._id} object={object} />
          ))}
        </div>
      )}
    </>
  );
};
