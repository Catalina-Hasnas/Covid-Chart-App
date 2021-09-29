import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';
import Romanian from './languages/ro.json';
import English from './languages/en-US.json';

const local = navigator.language;

let lang = English;
if (local === 'ro') {
  lang = Romanian;
} 

ReactDOM.render(
    <IntlProvider locale={local} messages={lang}>
      <App />
    </IntlProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
