import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../helpers/axiosClient';
import { Amenities } from '../../components/Amenities/Amenities';
import { SectionWithUnderlineTitle } from '../../components/SectionWithUnderlineTitle/SectionWithUnderlineTitle';
import { Map } from '../../components/Map/Map';
import { Host } from '../../components/Host/Host';
import { ConfigureReservationForm } from '../../components/ConfigureReservationForm/ConfigureReservationForm';
import { Gallery } from '../../components/Gallery/Gallery';
import { Loading } from '../../components/Loading/Loading';
import styles from './SingleOffer.module.scss';

const getOffer = async ({ id, navigate }) => {
  try {
    const { data } = (await axiosClient.get(`/offer/${id}`)).data;
    return data;
  } catch (e) {
    navigate('../../404');
    return null;
  }
};

export const SingleOffer = () => {
  const [offer, setOffer] = useState(undefined);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => getOffer({ id, navigate }).then((data) => setOffer(data)), [id, navigate]);

  return (
    <section className={styles.singleOffer}>
      {offer === null ? (
        <Loading />
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
