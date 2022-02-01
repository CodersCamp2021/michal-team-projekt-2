export const guestsValidation = {
  required: {
    value: true,
    message: 'Wymagana liczba gości',
  },
  min: {
    value: 1,
    message: 'Minimum 1 gość',
  },
};

export const localisationValidation = {
  required: {
    value: true,
    message: 'Wymagana lokalizacja',
  },
  minLength: {
    value: 3,
    message: 'Minimum 3 znaki',
  },
};

export const bedsValidation = {
  required: {
    value: true,
    message: 'Wybierz konfigurację łóżek',
  },
};

export const emailValidation = {
  required: {
    value: true,
    message: 'To pole jest wymagane!',
  },
  minLength: {
    value: 6,
    message: 'Email musi składać się minimum z 6 znaków!',
  },
  pattern: /^\S+@\S+$/i,
};
