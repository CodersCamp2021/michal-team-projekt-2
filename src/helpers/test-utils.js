import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

export const renderWithRouter = (ui, options = {}) => render(ui, { wrapper: Router, ...options });
