import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import gon from 'gon';
import { configureStore } from '@reduxjs/toolkit';
import '../assets/application.scss';
import Root from './ui/components/Root';
import slices from './redux/slices';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const store = configureStore({
  reducer: slices,
  preloadedState: { ...gon },
});

render(
  <Root store={store} />,
  document.querySelector('#chat'),
);
