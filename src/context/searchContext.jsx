import { useState, createContext, useContext } from 'react';
import { useSearchOffers } from '../hooks/useSearchOffers';

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [state, setState] = useState({ localisation: '', checkIn: new Date(), checkOut: new Date(), guests: 1 });
  const offers = useSearchOffers(state.localisation);
  const search = (formData) => {
    setState((prevState) => ({ ...prevState, ...formData }));
  };

  return <SearchContext.Provider value={{ state, search, offers }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('Search context must be used within a SearchProvider');
  return context;
};
