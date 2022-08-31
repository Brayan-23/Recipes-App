import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileComponent from '../components/ProfileComponent';
import '../css/Profile.scss';

function Profile({ history }) {
  return (
    <div id="profile">
      <Header history={ history } title="Profile" />
      <ProfileComponent />
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Profile;
