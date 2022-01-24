import React, { useEffect, useState } from 'react';
import { Amenities } from '../../components/Amenities/Amenities';
import { SectionWithUnderlineTitle } from '../../components/SectionWithUnderlineTitle/SectionWithUnderlineTitle';
import { Map } from '../../components/Map/Map';
import { Host } from '../../components/Host/Host';
import { ConfigureReservationForm } from '../../components/ConfigureReservationForm/ConfigureReservationForm';
import { Gallery } from '../../components/Gallery/Gallery';
import styles from './SingleOffer.module.scss';

const request = {
  title: 'Apartament z widokiem na morze',
  host: {
    name: 'Natalia Z',
    img: 'https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=430&q=80',
    languages: ['polski, angielski, niemiecki'],
    lastOnline: '5 godzin temu',
    hostFrom: 'czerwiec 2015',
    rating: 9.7,
    responseTime: 'kilka godzin',
  },
  information: `
    Velit culpa ipsum irure duis incididunt duis occaecat consequat nulla excepteur 
    duis non nisi ad. Elit Lorem reprehenderit ullamco laborum ex ex amet laborum tempor. 
    Cillum labore reprehenderit magna occaecat cupidatat cupidatat anim et nulla anim deserunt. 
    Exercitation proident proident ea voluptate quis laborum adipisicing. Sint deserunt est labore 
    commodo enim consequat elit anim commodo. Nostrud ut id id nisi aliquip elit consequat non qui ullamco 
    irure aute cupidatat anim.

    Velit culpa ipsum irure duis incididunt duis occaecat consequat nulla excepteur 
    duis non nisi ad. Elit Lorem reprehenderit ullamco laborum ex ex amet laborum tempor. 
    Cillum labore reprehenderit magna occaecat cupidatat cupidatat anim et nulla anim deserunt. 
    Exercitation proident proident ea voluptate quis laborum adipisicing. Sint deserunt est labore 
    commodo enim consequat elit anim commodo. Nostrud ut id id nisi aliquip elit consequat non qui ullamco 
    irure aute cupidatat anim.`,
  localisation: {
    address: 'Łazienkowska 3, Warsaw, Poland',
    latitude: 52.22136,
    longitude: 21.04067,
  },
  amenities: ['TV', 'DVD', 'Suszarka do włosów', 'Ręczniki', 'Czajnik', 'Herbata', 'Kawa'],
  price: 169,
  images: [
    'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80',
    'https://images.unsplash.com/photo-1633944095397-878622ebc01c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80',
  ],
};

const getOffer = () => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve(request), Math.random() * 1000);
  });
};

export const SingleOffer = () => {
  const [offer, setOffer] = useState(undefined);

  useEffect(() => getOffer().then((data) => setOffer(data)), []);

  return (
    <section className={styles.singleOffer}>
      {!offer ? (
        `Sorry, something went wrong. Please try again later.`
      ) : (
        <>
          <h2 className={styles.singleOfferTitle}>{offer.title}</h2>
          <Gallery images={offer.images} />
          <div className={styles.wrapper}>
            <div>
              <ul className={styles.nav}>
                <li>
                  <a className={styles.navLink} href="#information">
                    Informacje
                  </a>
                </li>
                <li>
                  <a className={styles.navLink} href="#host">
                    Gospodarz
                  </a>
                </li>
                <li>
                  <a className={styles.navLink} href="#amenities">
                    Udogodnienia
                  </a>
                </li>
                <li>
                  <a className={styles.navLink} href="#location">
                    Lokalizacja
                  </a>
                </li>
              </ul>

              <SectionWithUnderlineTitle title="Informacje" id="information">
                <p className={styles.information}>{offer.information}</p>
              </SectionWithUnderlineTitle>

              <SectionWithUnderlineTitle title="O gospodarzu" id="host">
                <Host host={offer.host} />
              </SectionWithUnderlineTitle>

              <SectionWithUnderlineTitle title="Udogodnienia" id="amenities">
                <Amenities amenities={offer.amenities} />
              </SectionWithUnderlineTitle>

              <SectionWithUnderlineTitle title="Lokalizacja" id="location">
                <Map location={offer.localisation} />
              </SectionWithUnderlineTitle>
            </div>

            <ConfigureReservationForm price={offer.price} />
          </div>
        </>
      )}
    </section>
  );
};
