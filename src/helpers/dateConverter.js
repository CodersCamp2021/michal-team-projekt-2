export const dateConverter = (dateString, option) => {
  const date = new Date(dateString);
  const locales = 'pl';
  if (option === 'day') return date.getDate();
  if (option === 'month') return date.toLocaleString(locales, { month: 'long' });
  if (option === 'year') return date.getFullYear();
  if (option === 'weekday') return date.toLocaleString(locales, { weekday: 'long' });
};
