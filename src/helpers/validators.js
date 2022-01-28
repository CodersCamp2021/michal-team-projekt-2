export const guestsValidation = {
  required: {
    value: true,
    message: 'Wymagana liczba gości',
  },
  min: {
    value: 1,
    message: 'Błędna liczba gości',
  },
};

export const localisationValidation = {
  required: {
    value: true,
    message: 'Wymagana lokalizacja',
  },
  minLength: {
    value: 3,
    message: 'Błędna Lokalizacja',
  },
  pattern: {
    pattern: /^[\D]+$/,
    message: 'Błędna Lokalizacja',
  },
};
