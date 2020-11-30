import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';

import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import AddExpense from '../dashboard/AddExpense';

const Routes = props => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/expenses/new" component={AddExpense} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
