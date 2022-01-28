export const guestsValidation = {
  required: {
    value: true,
    message: 'Liczba gości jest wymagana',
  },
  min: {
    value: 1,
    message: 'Niepoprawna liczba gości',
  },
};

export const localisationValidation = {
  required: {
    value: true,
    message: 'Lokalizacja jest wymagana',
  },
  minLength: {
    value: 3,
    message: 'Niepoprawna Lokalizacja',
  },
  pattern: {
    pattern: /^[\D]+$/,
    message: 'Niepoprawna Lokalizacja',
  },
};
