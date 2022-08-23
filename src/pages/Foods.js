import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Foods({ history }) {
  return (
    <div>
      <Header history={ history } title="Foods" />
      <Recipes title="Foods" />
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
