import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks({ history }) {
  return (
    <div>
      <Header history={ history } title="Drinks" />
      Drinks

    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Drinks;
