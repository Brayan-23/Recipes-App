import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import ProfileComponent from '../components/ProfileComponent';

function Profile({ history }) {
  return (
    <div>
      <Header history={ history } title="Profile" />
      <Recipes title="Profile" />
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
