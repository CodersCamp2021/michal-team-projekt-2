import { useState, useEffect } from 'react';
import { Filters } from './Filters/Filters';
import styles from './SearchFilters.module.scss';

export function SearchFilters(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    if (width >= 952) {
      setOpen(true);
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, [width]);

  const onClick = (e) => {
    setOpen(!open);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.header} onClick={onClick} disabled={disabled}>
        <p className={styles.headerName}>Filtry</p>
      </button>
      {open && <Filters price={props.price} checkbox={props.checkbox} />}
    </div>
  );
}
