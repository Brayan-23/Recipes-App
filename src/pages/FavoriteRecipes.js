import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../css/Favorite.scss';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const previousFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (previousFavoriteRecipes) setFavoriteRecipes(previousFavoriteRecipes);
  }, []);

  useEffect(() => {
  }, [favoriteRecipes]);

  const removeFavoriteHandle = (i) => {
    previousFavoriteRecipes.splice(i, [1]);
    localStorage.setItem('favoriteRecipes', JSON.stringify(previousFavoriteRecipes));
    setFavoriteRecipes(previousFavoriteRecipes);
    console.log(previousFavoriteRecipes);
  };

  return (
    <div className="favorite">
      <Header title="Favorite Recipes" />
      <div className="filter-fav-btn">
        <button type="button" data-testid="filter-by-food-btn">Foods </button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks </button>
        <button type="button" data-testid="filter-by-all-btn">All </button>
      </div>

      {favoriteRecipes.length !== 0 && favoriteRecipes.map((recipe, i) => (
        <div id="mainAoQuadraxion" key={ recipe.id }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className="foodimage"
              data-testid={ `${i}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
          </Link>
          <div className="nameAndType">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h2 data-testid={ `${i}-horizontal-name` }>{recipe.name}</h2>
            </Link>
            <p data-testid={ `${i}-horizontal-top-text` }>
              {recipe.type === 'drink'
                ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <div className="button">
              <button
                className="share-btn"
                type="button"
                data-testid={ `${i}-sharebutton` }
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
              <button
                type="button"
                onClick={ () => removeFavoriteHandle(i) }
              >
                <img
                  className="fav-btn"
                  alt="Botão de Favorito"
                  src={ favoriteIcon }
                  data-testid={ `${i}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
}
export default FavoriteRecipes;
