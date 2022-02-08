import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import { App } from './components/App/App';
import './styles/index.scss';
import { reportWebVitals } from './reportWebVitals';
import { AuthProvider } from './context/authContext';

render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
