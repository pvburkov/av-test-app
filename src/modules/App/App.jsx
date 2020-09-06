import React, { memo, Fragment } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from 'components/Notifications';
import AuthForm from 'modules/AuthForm';
import Workplace from 'modules/Workplace';
import './App.css';

const App = ({ notifications }) => (
  <Fragment>
    <Switch>
      <Route path="/work">
        <Workplace />
      </Route>
      <Route path="/" render={({ history }) => (
        <AuthForm historyPush={history.push} />
      )} />
    </Switch>
    <Notifications notifications={notifications} />
  </Fragment>
);

const mapStateToProps = ({ notifications }) => ({ notifications });

export default memo(connect(mapStateToProps)(App));

App.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf(['success', 'failure']),
      text: PropTypes.string
    })
  ).isRequired
};
