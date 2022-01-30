import React from 'react';
import styles from './SectionWithUnderlineTitle.module.scss';

export const SectionWithUnderlineTitle = ({ title, id, children }) => {
  return (
    <section className={styles.section} id={id}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </section>
  );
};
