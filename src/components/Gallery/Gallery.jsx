import styles from './Gallery.module.scss';

export const Gallery = ({ images }) => {
  return (
    <div className={styles.gallery}>
      {images.map(({ image, index }) => (
        <img
          key={image}
          src={image}
          alt=""
          className={index === 0 ? styles.galleryBig : `${styles.gallerySmall} ${styles['gallerySmall_' + index]}`}
        />
      ))}
    </div>
  );
};
