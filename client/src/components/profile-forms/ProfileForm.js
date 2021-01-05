import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const initialState = {
  location: '',
  status: '',
  bio: '',
  address:'',
  phoneno:''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);


  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
  
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    status,
    location,
    bio,
    address,
    phoneno
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Add some changes to your profile
      </p>
      <small>* = required field</small>
      <form className="form-Pro" onSubmit={onSubmit}>
        <div className="form-group-Profile">
        <small className="form-text-Pro">
            Give us an idea of where you are at in your career
          </small>
          <select class="status" name="status" value={status} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>

        </div>
        
        <div className="form-group-Profile">
        <small className="form-text-Pro"> City & state suggested (eg. Boston, MA)
          </small>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
         
           
        </div>
        
        <div className="form-group-Profile">
        <small className="form-text-Pro">Tell us a little about yourself</small>
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          
        </div>

        
        <div className="form-group-Profile">
        <small className="form-text-Pro">Where do you stay?</small>
          <textarea
            placeholder="Address"
            name="address"
            value={address}
            onChange={onChange}
          />
         
        </div>
        <div className="form-group-Profile">
          <input
            type="number"
            placeholder="Phone number"
            name="phoneno"
            value={phoneno}
            onChange={onChange}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);