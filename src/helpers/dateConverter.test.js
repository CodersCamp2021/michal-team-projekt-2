import { dateConverter } from './dateConverter';

const date = 'Wed Feb 09 2022 01:25:29 GMT+0100';

it('should return the day of the month - 9', () => {
  expect(dateConverter(date, 'day')).toBe(9);
});

it('should return the name of the month - luty', () => {
  expect(dateConverter(date, 'month')).toBe('luty');
});

it('should return a year - 2022', () => {
  expect(dateConverter(date, 'year')).toBe(2022);
});

it('should return the name of the weekday - środa', () => {
  expect(dateConverter(date, 'weekday')).toBe('środa');
});
