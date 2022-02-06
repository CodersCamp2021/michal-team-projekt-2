import styles from './Loading.module.scss';
import { LoaderDot } from './LoaderDot';

export const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperLoader}>
        {[...Array(6).keys()].map((i) => (
          <LoaderDot key={i} />
        ))}
        <p className={styles.wrapperLoaderText}>Please wait while loading</p>
      </div>
    </div>
  );
};
