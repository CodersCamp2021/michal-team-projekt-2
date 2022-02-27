import { render, screen } from '@testing-library/react';
import { DetailsSummary } from './DetailsSummary';

// const data = {
//   status: 'zarezerwowany',
//   phone: '+48 500 100 200',
//   address: 'Łazienkowska 3, Warszawa, Polska',
//   title: 'Apartament z widokiem na morze',
//   image:
//     'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
// };

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
