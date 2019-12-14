import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import Root from './components/Root/index';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// import faker from 'faker';
// import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(
  <Root />,
  document.querySelector('#chat'),
);
