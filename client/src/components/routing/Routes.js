import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import AddEducation from '../profile-forms/AddEducation';
import Expenses from '../dashboard/Expenses';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Stats from '../stats/Stats';
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
        <PrivateRoute exact path="/profiles" component={Profiles} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/expenses/new" component={AddExpense} />
        <PrivateRoute exact path="/statistics" component={Stats} />
        <PrivateRoute exact path="/expenses/all" component={Expenses} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
