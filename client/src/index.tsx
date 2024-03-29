import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

import './index.scss';
import { theme } from './shared/mui-theme';
import { ThemeProvider } from '@mui/material';


render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
