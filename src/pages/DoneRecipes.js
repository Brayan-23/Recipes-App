import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function DoneRecipes({ history }) {
  return (
    <div>
      <Header history={ history } title="Done Recipes" />
      DoneRecipes
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default DoneRecipes;
