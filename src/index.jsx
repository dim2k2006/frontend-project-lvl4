import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import get from 'lodash/get';
import '../assets/application.scss';
import Root from './ui/components/Root/index';
import configureStore from './redux/store';

// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const initialState = get(window, 'gon', {});
const store = configureStore(initialState);

render(
  <Root store={store} />,
  document.querySelector('#chat'),
);
