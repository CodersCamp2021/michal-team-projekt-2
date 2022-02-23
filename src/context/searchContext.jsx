import { useState, createContext, useContext } from 'react';
import { useSearchOffers } from '../hooks/useSearchOffers';

export const languages = ['english', 'polish', 'german', 'spanish', 'french'];
export const accomodationTypes = ['hotel', 'hostel', 'apartment', 'house'];

export const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [state, setState] = useState({
    localisation: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guests: 1,
    minPrice: 0,
    maxPrice: 500,
    hostLanguages: languages,
    accomodationTypes: accomodationTypes,
  });
  const offers = useSearchOffers(state.localisation);
  const search = (formData) => {
    setState((prevState) => ({ ...prevState, ...formData }));
  };

  return (
    <SearchContext.Provider value={{ state, search, offers, languages, accomodationTypes }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('Search context must be used within a SearchProvider');
  return context;
};
