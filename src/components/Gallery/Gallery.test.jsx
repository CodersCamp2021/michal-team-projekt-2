import { render, screen } from '@testing-library/react';

import { Gallery } from './Gallery';

test('renders Gallery and showing images', async () => {
  const fakeGallery = [
    {
      index: 1,
      images:
        'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
    {
      index: 2,
      images:
        'https://images.unsplash.com/photo-1631048501851-4aa85ffc3be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    },
  ];
  render(<Gallery images={fakeGallery} />);
  await screen.findAllByRole('img');
});
