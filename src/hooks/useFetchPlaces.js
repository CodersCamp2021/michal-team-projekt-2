import { useEffect, useState } from 'react';
import { request } from '../helpers/request';

export const useFetchPlaces = (localisation) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const { features, error } = await request(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${localisation}.json?&types=place&access_token=${process.env.REACT_APP_MAP_ACCESS_TOKEN}`,
      );
      if (features) {
        setSuggestions(features.map(({ place_name }) => place_name));
        setError('');
      }
      if (error) {
        setError('Cant fetch suggestions');
        setSuggestions([]);
      }
    };
    if (localisation) fetchData();
  }, [localisation]);

  return { suggestions, error };
};
