import { useEffect, useState } from 'react';
import { request } from '../helpers/request';
import { axiosClient } from '../helpers/axiosClient';

export const useSearchOffers = (localisation) => {
  const [offers, setOffers] = useState([]);
  const [objectCoordinates, setObjectCoordinates] = useState([]);

  useEffect(() => {
    const calculateDistance = (place, offer) =>
      ((place[1] - offer.longitude) ** 2 + (place[0] - offer.latitude) ** 2) ** 0.5;

    const getClosestOffers = (place) => {
      const distanceList = objectCoordinates.map((obj) => ({
        id: obj.id,
        distance: calculateDistance(place, obj.coordinates),
      }));
      return distanceList
        .slice(0, 10)
        .sort((a, b) => a.distance - b.distance)
        .map((offer) => offer.id);
    };

    const fetchData = async () => {
      const { features } = await request(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${localisation}.json?&types=place&access_token=${process.env.REACT_APP_MAP_ACCESS_TOKEN}`,
      );
      if (features[0]?.geometry.coordinates) {
        const offerIDs = getClosestOffers(features[0].geometry.coordinates);
        const requestArray = await Promise.all(offerIDs.map((id) => axiosClient.get(`/objects/${id}`)));
        setOffers(requestArray.map((request) => request.data));
      }
    };

    if (localisation) fetchData();
  }, [localisation, objectCoordinates]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosClient.get('/objects');
      setObjectCoordinates(data.map((offer) => ({ id: offer['id'], coordinates: offer['localisation'] })));
    };
    fetchData();
  }, []);

  return offers;
};
