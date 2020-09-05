import React, { memo, Fragment } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import AuthForm from 'modules/AuthForm';
import Workplace from 'modules/Workplace';
import './App.css';

const App = () => (
  <Fragment>
    <Switch>
      <Route path="/work">
        <Workplace />
      </Route>
      <Route path="/">
        <AuthForm />
      </Route>
    </Switch>
  </Fragment>
);

export default memo(App);