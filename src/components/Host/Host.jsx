import styles from './Host.module.scss';

export const Host = ({ host }) => {
  const { img, name, languages, responseTime, hostFrom, rating, lastOnline } = host;
  return (
    <div className={styles.host}>
      <img className={styles.hostPhoto} src={img} alt={name} />
      <div className={styles.hostDesc}>
        <p className={styles.hostName}>{name}</p>
        <ul>
          <li>
            <span>Języki: </span> {languages}
          </li>
          <li>
            <span>Czas odpowiedzi: </span> {responseTime}
          </li>
          <li>
            <span>Wynajmuje od: </span> {hostFrom}
          </li>
          <li>
            <span>Ocena gospodarza: </span> {rating}
          </li>
          <li>
            <span>Ostatnio online: </span> {lastOnline}
          </li>
        </ul>
      </div>
    </div>
  );
};
