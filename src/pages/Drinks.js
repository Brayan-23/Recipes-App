import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks({ history }) {
  return (
    <div>
      <Header history={ history } title="Drinks" />
      <Recipes title="Drinks" />
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
