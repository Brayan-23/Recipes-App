import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks({ history }) {
  return (
    <div>
      <Header history={ history } title="Drinks" />
      Drinks
      <Footer />

    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Drinks;
