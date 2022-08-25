import React, { /*  useContext, */ useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { fetchItemFood, fetchItemCock } from '../helpers/FetchApi';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
/* import { fetchContext } from '../context/LoginContext'; */

function Buttons({ url, id, title }) {
/*   const { originalCocks, originalFoods } = useContext(fetchContext); */
  const [copied, setCopied] = useState(true);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    const getLocalFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getLocalFavorite !== null) {
      const response = getLocalFavorite.some((elem) => elem.id === id);
      setHeart(response);
    }
  }, []);

  const objFoods = (find) => ({
    id: find.idMeal,
    type: 'food',
    nationality: find.strArea,
    category: find.strCategory,
    alcoholicOrNot: '',
    name: find.strMeal,
    image: find.strMealThumb,
  });

  const objCoocks = (find) => ({
    id: find.idDrink,
    type: 'drink',
    nationality: '',
    category: find.strCategory,
    alcoholicOrNot: find.strAlcoholic,
    name: find.strDrink,
    image: find.strDrinkThumb,
  });

  const favoriteRecipes = async () => {
    const getLocalFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (title === 'Foods') {
      const { meals } = await fetchItemFood(id);
      const result = objFoods(meals[0]);
      if (getLocalFavorite === null) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([result]));
      } else {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...getLocalFavorite, result]));
      }
    }
    if (title === 'Drinks') {
      const { drinks } = await fetchItemCock(id);
      const result = objCoocks(drinks[0]);
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
      <label htmlFor="favorite">
        <input
          type="image"
          id="favorite"
          src={ heart ? blackHeartIcon : whiteHeartIcon }
          alt="icone"
          data-testid="favorite-btn"
          onClick={ () => {
            setHeart(!heart);
            favoriteRecipes();
          } }
        />
      </label>
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
