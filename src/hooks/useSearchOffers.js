import { useEffect, useState } from 'react';
import { axiosClient } from '../helpers/axiosClient';

export const useSearchOffers = (filters) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = (await axiosClient.get('/offer', { params: filters })).data;
      setOffers(data);
    };
    fetchData();
  }, [filters]);

  return offers;
};
