import { render, screen } from '@testing-library/react';
import { PricesSummary } from './PricesSummary';

describe('PricesSummary', () => {
  const price = 189;
  const totalPrice = 378;
  it('should render component', () => {
    render(<PricesSummary price={price} totalPrice={totalPrice} />);
    expect(screen.getByText(/Łacznie/i)).toBeInTheDocument();
    expect(screen.getByText(/Doba/i)).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  it('should show good price and totalPrice', () => {
    render(<PricesSummary price={price} totalPrice={totalPrice} />);

    expect(screen.getByTestId('price')).toBeInTheDocument();
    expect(screen.getByTestId('price')).toHaveTextContent(`${price} zł`);

    expect(screen.getByTestId('totalPrice')).toBeInTheDocument();
    expect(screen.getByTestId('totalPrice')).toHaveTextContent(`${totalPrice} zł`);
  });
});
