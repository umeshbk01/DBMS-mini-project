import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
    <section className="container h-100">
      {/* <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p> */}
      <div className="row h-100">
        <div className="card col-md-12 my-auto">
            <div className="row card-body">
                <div className="col-md-6">
                    <div className="card-title text-center">
                       <h2 className="large text-primary">
                       <i className="fas fa-user" />
                       <strong>
                        Sign Up
                        </strong>
                       </h2>
                       
                    </div>
                    <div className="text-secondary w-100 text-center">
                       
                    </div>
                    <div className="authpic"></div>
                </div>
                <div className="col-md-1">
                   
                </div>
                <div className="col-md-5">
               
                <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
          />
        </div>
        {/* <div className="form-group">
          <input
            type="text"
            placeholder="Job"
            name="job"
            value={job}
            onChange={onChange}
          />
        </div> */}
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
          </div>          
          <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
            </div>
        </div>
    </div>

      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);