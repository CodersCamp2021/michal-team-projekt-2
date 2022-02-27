import { render, screen } from '@testing-library/react';
import { DetailsSummary } from './DetailsSummary';

describe('DetailsSummary', () => {
  it('should render component with correct values', () => {
    render(
      <DetailsSummary
        title="Apartament z widokiem na morze"
        address="Łazienkowska 3, Warszawa, Polska"
        phone="+48 500 100 200"
        status="zarezerwowany"
      />,
    );
    const dsImg = screen.getByRole('img');
    expect(dsImg).toBeInTheDocument();

    const dsTitle = screen.getByText('Apartament z widokiem na morze');
    expect(dsTitle).toBeInTheDocument();

    const dsStatus = screen.getByText('zarezerwowany');
    expect(dsStatus).toBeInTheDocument();

    const dsPhone = screen.getByText('+48 500 100 200');
    expect(dsPhone).toBeInTheDocument();

    const dsAddress = screen.getByText('Łazienkowska 3, Warszawa, Polska');
    expect(dsAddress).toBeInTheDocument();
  });
});
