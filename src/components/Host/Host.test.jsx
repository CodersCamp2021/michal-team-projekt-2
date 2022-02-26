import { render, screen } from '@testing-library/react';
import { Host } from './Host';

const data = {
  name: 'Natalia Z',
  img: 'https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=430&q=80',
  languages: ['polski, angielski, niemiecki'],
  lastOnline: '5 godzin temu',
  hostFrom: 'czerwiec 2015',
  rating: 9.7,
  responseTime: 'kilka godzin',
};

describe('Host', () => {
  it('should render host component with correct values', () => {
    render(<Host host={data} />);
    const hostPic = screen.getByRole('img');
    expect(hostPic).toBeInTheDocument();

    const hostName = screen.getByText('Natalia Z');
    expect(hostName).toBeInTheDocument();

    const hostLanguages = screen.getByText('polski, angielski, niemiecki');
    expect(hostLanguages).toBeInTheDocument();

    const hostLastOnline = screen.getByText('5 godzin temu');
    expect(hostLastOnline).toBeInTheDocument();

    const hostingFrom = screen.getByText('czerwiec 2015');
    expect(hostingFrom).toBeInTheDocument();

    const hostRating = screen.getByText('9.7');
    expect(hostRating).toBeInTheDocument();

    const hostResponseTime = screen.getByText('kilka godzin');
    expect(hostResponseTime).toBeInTheDocument();
  });
  it('should render list in host component', () => {
    render(<Host host={data} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });
});
