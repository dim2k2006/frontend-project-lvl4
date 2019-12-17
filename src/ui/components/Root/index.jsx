import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '../Layout/index';

const Root = ({ store }) => (
  <Provider store={store}>
    <Layout />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
  }).isRequired,
};

export default Root;
