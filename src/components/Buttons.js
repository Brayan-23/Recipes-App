import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import { fetchContext } from '../context/LoginContext';

function Buttons({ url, id, title }) {
  const { originalCocks, originalFoods } = useContext(fetchContext);
  const [copied, setCopied] = useState(true);

  const objFoods = (find) => ({
    id: find.idMeal,
    type: 'food',
    nationality: find.strArea,
    category: find.strCategory,
    alcoholicOrNot: '',
    name: find.strMeal,
    imagem: find.strMealThumb,
  });

  const objCoocks = (find) => ({
    id: find.idDrink,
    type: 'drink',
    nationality: '',
    category: find.strCategory,
    alcoholicOrNot: find.strAlcoholic,
    name: find.strDrink,
    imagem: find.strDrinkThumb,
  });

  const favoriteRecipes = () => {
    const getLocalFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (title === 'Foods') {
      const find = originalFoods.find((elem) => elem.idMeal === id);
      const result = objFoods(find);
      if (getLocalFavorite === null) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([result]));
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...getLocalFavorite, result]));
      }
    }
    if (title === 'Drinks') {
      const find = originalCocks.find((elem) => elem.idDrink === id);
      const result = objCoocks(find);
      if (getLocalFavorite === null) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([result]));
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...getLocalFavorite, result]));
      }
    }
  };

  return (
    <section>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(url);
          setCopied(false);
        } }
      >
        <img src={ shareIcon } alt="Icone" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoriteRecipes }
      >
        Favoritar

      </button>
      {!copied && <p>Link copied!</p> }
    </section>
  );
}

Buttons.propTypes = {
  id: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Buttons;
