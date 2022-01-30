export const guestsValidation = {
  required: {
    value: true,
    message: 'Pole Goście jest wymagane',
  },
  min: {
    value: 1,
    message: 'Minimalna liczba gości wynosi 1',
  },
};

export const bedsValidation = {
  required: {
    value: true,
    message: 'Wybierz konfigurację łóżek',
  },
};
