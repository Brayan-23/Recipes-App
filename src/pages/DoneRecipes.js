import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../css/doneRecipes.scss';

function DoneRecipes({ history }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const allDRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    if (allDRecipes) setDoneRecipes(allDRecipes);
  }, []);

  return (
    <div className="done">
      <Header history={ history } title="Done Recipes" />
      <button
        className="btn"
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Foods
        {' '}

      </button>

      <button
        className="btn"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drinks
        {' '}

      </button>

      <button
        className="btn"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
        {' '}

      </button>
      <section className="total">
        {doneRecipes.length !== 0
      && doneRecipes.filter((e) => (!filter ? e : e.type === filter))
        .map((recipe, i) => (
          <div id="mainAoQuadraxion" key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h3 data-testid={ `${i}-horizontal-name` }>{recipe.name}</h3>
              <img
                data-testid={ `${i}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <section className="info">
              <p className="tags" data-testid={ `${i}-horizontal-done-date` }>
                { recipe.doneDate }
              </p>
              <p className="tags" data-testid={ `${i}-${recipe.tags[0]}-horizontal-tag` }>
                { recipe.tags[0] }
              </p>
              <p className="tags" data-testid={ `${i}-${recipe.tags[1]}-horizontal-tag` }>
                {recipe.tags[1]}
              </p>
              <input
                type="image"
                onClick={ () => {
                  global.alert('Link Copied');
                  copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
                } }
                className="buttons"
                alt="Botão de Compartilhar"
                src={ shareIcon }
                data-testid={ `${i}-horizontal-share-btn` }
              />

              <input
                className="buttons"
                type="image"
                alt="Botão de Favorito"
                src={ favoriteIcon }
                data-testid={ `${i}-horizontal-favorite-btn` }
              />
              <p data-testid={ `${i}-horizontal-top-text` }>
                {recipe.type === 'drink'
                  ? recipe.alcoholicOrNot
                  : `${recipe.nationality} - ${recipe.category}`}
              </p>
            </section>
          </div>
        ))}
      </section>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default DoneRecipes;
