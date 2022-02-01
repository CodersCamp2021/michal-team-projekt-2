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

export const signUpError = {
  message: 'Podany adres e-mail jest już używany na innym koncie',
};

export const signInError = {
  message: 'Niepoprawny login lub hasło',
};
