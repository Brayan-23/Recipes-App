import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Foods({ history }) {
  return (
    <div>
      <Header history={ history } title="Foods" />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Foods;
