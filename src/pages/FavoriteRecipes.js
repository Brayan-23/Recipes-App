import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes({ history }) {
  return (
    <div>
      <Header history={ history } title="Favorite Recipes" />
      FavoriteRecipes

    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default FavoriteRecipes;
