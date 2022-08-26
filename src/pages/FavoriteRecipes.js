import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const previousFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (previousFavoriteRecipes) setFavoriteRecipes(previousFavoriteRecipes);
  }, []);

  return (
    <div id="main">
      <Header title="Favorite Recipes" />
      <button type="button" data-testid="filter-by-food-btn">Foods </button>

      <button type="button" data-testid="filter-by-drink-btn">Drinks </button>

      <button type="button" data-testid="filter-by-all-btn">All </button>

      {favoriteRecipes.length !== 0 && favoriteRecipes.map((recipe, i) => (
        <div id="mainAoQuadraxion" key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <h2 data-testid={ `${i}-horizontal-name` }>{recipe.name}</h2>
            <img
              data-testid={ `${i}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <button
            type="button"
            onClick={ ({ target }) => {
              target.innerHTML = 'Link copied!';
              copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
            } }
          >
            <img
              alt="Botão de Compartilhar"
              src={ shareIcon }
              data-testid={ `${i}-horizontal-share-btn` }
            />
          </button>

          <button type="button">
            <img
              alt="Botão de Favorito"
              src={ favoriteIcon }
              data-testid={ `${i}-horizontal-favorite-btn` }
            />
          </button>
          <p data-testid={ `${i}-horizontal-top-text` }>
            {recipe.type === 'drink'
              ? recipe.alcoholicOrNot
              : `${recipe.nationality} - ${recipe.category}`}
          </p>
        </div>
      ))}
    </div>
  );
}
export default FavoriteRecipes;
