import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios';

import './index.css';
import App from './App';
import store from './redux/store';
import { persistor } from './redux/store';

axios.defaults.baseURL = 'https://anotepad-server.herokuapp.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>
);
