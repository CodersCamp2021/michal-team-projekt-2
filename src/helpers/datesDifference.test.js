import { datesDifference } from './datesDifference';

it('should return date difference equal to 0', () => {
  const start = 'Wed Feb 09 2022 01:25:29 GMT+0100';
  const end = 'Wed Feb 09 2022 01:25:29 GMT+0100';
  expect(datesDifference(start, end)).toBe(0);
});

it('should return date difference equal to 6', () => {
  const start = 'Wed Feb 09 2022 01:25:29 GMT+0100';
  const end = 'Wed Feb 15 2022 01:25:29 GMT+0100';
  expect(datesDifference(start, end)).toBe(6);
});

it('should return date difference equal to -6', () => {
  const start = 'Wed Feb 15 2022 01:25:29 GMT+0100';
  const end = 'Wed Feb 09 2022 01:25:29 GMT+0100';
  expect(datesDifference(start, end)).toBe(-6);
});
