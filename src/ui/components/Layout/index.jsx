import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import flow from 'lodash/flow';
import { connect } from 'react-redux';
import Aside from '../Aside/index';
import * as actions from '../../../redux/actions';

const Layout = ({ activateChannel }) => {
  const location = useLocation();

  useEffect(() => {
    activateChannel({ channel: location.pathname });
  });

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-2  h-100 bg-info">
          <Aside />
        </div>

        <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-10 h-100" />
      </div>
    </div>
  );
};

export default flow(
  connect(
    null,
    actions,
  ),
)(Layout);
