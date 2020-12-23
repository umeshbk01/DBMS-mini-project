import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getProfileById } from '../../actions/profile';

const Navbar = ({ getProfileById, auth: { isAuthenticated }, logout, profile: { id }, match }) => {
  // useEffect(() => {
  //   getProfileById(match.params.id);
  // }, [getProfileById, match.params.id]);
  const authLinks = (
    <ul>
    <li>
      <Link to={`/profile/${id}`}>Profile</Link>
    </li>
      <li>
        <Link to="/statistics">Stats</Link>
      </li>
      <li>
        <Link to="/expenses/new">Add Expense</Link>
      </li>
      <li>
        <Link to="/expenses/all">Expenses</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark1">
      <div className='logo'>
      <h2>
       
        <i className="fas fa-hand-holding-usd" /> Expense Tracker
      
      </h2>
      </div>
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout, getProfileById })(Navbar);