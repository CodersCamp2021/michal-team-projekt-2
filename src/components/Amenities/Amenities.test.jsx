import { render, screen, within } from '@testing-library/react';
import { Amenities } from './Amenities';

it('should render a component with one item and list class name amenities', () => {
  const mockData = ['TV'];
  render(<Amenities amenities={mockData} />);

  const list = screen.getByRole('list');
  expect(list).toHaveClass('amenities');

  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(1);
});

it('should render a component with two items and list class names amenities amenitiesTwoColumns', () => {
  const mockData = ['TV', 'radio'];
  render(<Amenities amenities={mockData} />);

  const list = screen.getByRole('list');
  expect(list).toHaveClass('amenities amenitiesTwoColumns');

  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(2);
});

it('should render a component with three items and list class names amenities amenitiesThreeColumns', () => {
  const mockData = ['TV', 'radio', 'towels'];
  render(<Amenities amenities={mockData} />);

  const list = screen.getByRole('list');
  expect(list).toHaveClass('amenities amenitiesThreeColumns');

  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(3);
});

it('should render a component with five items and list class names amenities amenitiesThreeColumns', () => {
  const mockData = ['TV', 'radio', 'towels', 'tea', 'coffee'];
  render(<Amenities amenities={mockData} />);

  const list = screen.getByRole('list');
  expect(list).toHaveClass('amenities amenitiesThreeColumns');

  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(5);
});
