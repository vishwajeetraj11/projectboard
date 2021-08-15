import { StylesProvider, ThemeProvider } from '@material-ui/core';
import { Auth0ProviderWithHistory } from 'auth/auth0-provider-with-history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { theme } from 'shared/theme';
import { store } from 'store/store';
import { App } from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <Provider store={store}>
        <BrowserRouter>
          <Auth0ProviderWithHistory>
            <App />
          </Auth0ProviderWithHistory>
        </BrowserRouter>
      </Provider>
    </StylesProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
