export const datesDifference = (start, end) => {
  const difference = new Date(end) - new Date(start);
  const differenceInDays = Math.round(difference / (24 * 60 * 60 * 1000));
  return differenceInDays;
};
