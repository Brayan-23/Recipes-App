import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Foods({ history }) {
  return (
    <div>
      <Header history={ history } title="Foods" />
      <Footer />

    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Foods;
