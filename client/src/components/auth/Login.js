import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
          <div className="container h-100">

<div className="row h-100">
    <div className="card col-md-12 my-auto">
        <div className="row card-body">
            <div className="col-md-6">
                <div className="card-title text-center">
                <h2 className="large text-primary">
                       <i className="fas fa-user" />
                       <strong>
                        Sign In
                        </strong>
                       </h2>
                </div>
                <div className="text-secondary w-100 text-center">
                   
                </div>
                <div className="authpic"></div>
            </div>
            <div className="col-md-1">
                <div className="v-line"></div>
            </div>
            <div className="col-md-5 text-align">
                

                <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
            </div>
            <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
        </div>
    </div>
</div>

</div>
        </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);