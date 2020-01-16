import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import flow from 'lodash/flow';
import get from 'lodash/get';
import toNumber from 'lodash/toNumber';
import { connect } from 'react-redux';
import Aside from '../Aside/index';
import Nav from '../Nav/index';
import * as actions from '../../../redux/actions';

const Layout = ({ activateChannel }) => {
  const match = useRouteMatch();

  useEffect(() => {
    const channel = toNumber(get(match, 'params.channel'));

    activateChannel({ channel });
  });

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-4 col-sm-4 col-md-3 col-lg-3 col-xl-2  h-100 bg-info">
          <Aside />
        </div>

        <div className="col-8 col-sm-8 col-md-9 col-lg-9 col-xl-10 h-100">
          <div className="row">
            <Nav />


          </div>
        </div>
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
