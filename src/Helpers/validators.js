export const firstNameValidation = {
  required: {
    value: true,
    message: 'Imię jest wymagane',
  },
  minLength: {
    value: 2,
    message: 'Imię musi składać się conajmnie z dwóch znaków',
  },
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: 'Imię może zawierać tylko litery',
  },
};

export const surNameValidation = {
  required: {
    value: true,
    message: 'Nazwisko jest wymagane',
  },
  pattern: {
    value: /^[a-zA-Z]+$/,
    message: 'Nazwisko może zawierać tylko litery',
  },
  minLength: {
    value: 2,
    message: 'Nazwisko musi składać się conajmniej z dwóch znaków',
  },
};

export const emailValidation = {
  required: {
    value: true,
    message: 'Email jest wymagany',
  },
  minLength: {
    value: 4,
    message: 'Email musi składać się conajmniej z 4 znaków',
  },
  pattern: {
    value:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/,
    message: 'Email jest nie poprawny',
  },
};

export const passwordValidation = {
  required: {
    value: true,
    message: 'Hasło jest wymagane',
  },
  minLength: {
    value: 8,
    message: 'Hasło musi składać się conajmniej z 8 znaków',
  },
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/,
    message: 'Hasło musi zawierać cyfrę, znak specjalny, małą i dużą literę',
  },
};

export const birthdayValidation = {
  required: {
    value: true,
    message: 'Data urodzenia jest wymagana',
  },
};
