import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter} from 'react-router-dom';
import {Routing} from './routing';
import {worker} from './api/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start({onUnhandledRequest: 'bypass'}).then().catch();
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routing/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
