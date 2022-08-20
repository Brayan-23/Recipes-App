import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Profile({ history }) {
  return (
    <div>
      <Header history={ history } title="Profile" />
      Profile

    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Profile;
