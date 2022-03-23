import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { App } from './components/App/App';
import './styles/index.scss';
import { reportWebVitals } from './reportWebVitals';
import { AuthProvider } from './context/authContext';
import { SearchProvider } from './context/searchContext';
import { ReservationProvider } from './context/reservationContext';

render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <SearchProvider>
          <ReservationProvider>
            <App />
          </ReservationProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
