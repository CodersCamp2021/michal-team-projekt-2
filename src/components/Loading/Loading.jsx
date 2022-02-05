import styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperLoader}>
        <span className={styles.wrapperLoaderDot}></span>
        <span className={styles.wrapperLoaderDot}></span>
        <span className={styles.wrapperLoaderDot}></span>
        <span className={styles.wrapperLoaderDot}></span>
        <span className={styles.wrapperLoaderDot}></span>
        <span className={styles.wrapperLoaderDot}></span>
        <p className={styles.wrapperLoaderText}>Please wait while loading</p>
      </div>
    </div>
  );
};
