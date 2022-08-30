import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Buttons from './Buttons';
import {
  fetchItemCock,
  fetchItemFood,
  fetchCocksAll,
  fetchFoodsAll } from '../helpers/FetchApi';
import '../css/Details.scss';

const START_RECICPE = 'Start Recipe';

function RecipeDetails({ title, match: { params: { id } } }) {
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [ingr, setIngr] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [copyUrl, setCopyUrl] = useState('');

  useEffect(() => {
    const result = async () => {
      const number5 = 5;
      if (title === 'Drinks') {
        const { meals } = await fetchFoodsAll();
        const { drinks } = await fetchItemCock(id);
        const chaves = Object.entries(drinks[0]);
        const filter = meals.filter((elem, index) => index <= number5 && elem);
        setRecomendations(filter);
        setCopyUrl(`http://localhost:3000/drinks/${id}`);
        setIngr(chaves);
        setDetails(drinks[0]);
      }
      if (title === 'Foods') {
        const { drinks } = await fetchCocksAll();
        const { meals } = await fetchItemFood(id);
        const chaves = Object.entries(meals[0]);
        const filter = drinks.filter((elem, index) => index <= number5 && elem);
        setRecomendations(filter);
        setCopyUrl(`http://localhost:3000/foods/${id}`);
        setIngr(chaves);
        setDetails(meals[0]);
      }
    };
    result();
  }, []);

  const ingredients = () => {
    const filterIngredient = ingr
      .filter((elem) => elem[0].includes('strIngredient'));
    const filterMeasure = ingr.filter((elem) => elem[0].includes('strMeasure'));
    return (
      <section
        className="ingredients"
      >
        {filterIngredient.map((elem, index) => (
          elem[1]
          && (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ `Ingrediente ${index}` }
            >
              {`${elem[1]} ${filterMeasure[index][1]}`}
            </p>
          )
        ))}
      </section>
    );
  };

  const storageDone = () => {
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    if (done !== null) {
      const check = done.some((elem) => elem.id === id);
      if (check) { return true; }
      if (!check) { return false; }
    }
  };

  const startAndContinue = () => {
    const progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progress === null) { return START_RECICPE; }
    if (title === 'Foods') {
      const check = id in progress.meals;
      return check ? 'Continue Recipe' : START_RECICPE;
    }
    if (title === 'Drinks') {
      const check = id in progress.cocktails;
      return check ? 'Continue Recipe' : START_RECICPE;
    }
  };

  const pushDinksAndFoods = () => {
    if (startAndContinue() === START_RECICPE && title === 'Foods') {
      history.push(`/foods/${id}/in-progress`);
    }
    if (startAndContinue() === START_RECICPE && title === 'Drinks') {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div className="details-recipe">
      <div className="recipes-header">
        <h1
          className="recipe-title"
          data-testid="recipe-title"
        >
          {title === 'Foods'
            ? details.strMeal
            : details.strDrink}
        </h1>
        {title === 'Foods'
          ? <h3 data-testid="recipe-category">{details.strCategory}</h3>
          : <h3 data-testid="recipe-category">{details.strAlcoholic}</h3> }
        <Buttons id={ id } title={ title } url={ copyUrl } />
      </div>
      <img
        src={ title === 'Foods'
          ? details.strMealThumb
          : details.strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
        className="recipe-img"
      />
      <h2>
        Instruções
      </h2>
      <p
        className="instructions"
        data-testid="instructions"
      >
        {details.strInstructions}

      </p>
      {title === 'Foods'
      && <iframe
        width="350"
        height="400"
        data-testid="video"
        src={ details.strYoutube }
        title="YouTube video player"
        allowFullScreen
      />}
      <h2>
        Ingredientes
      </h2>
      {ingredients()}
      {/* <p>nada</p> */}
      <div className="carousel">
        {recomendations.map((elem, index) => (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ `recipes ${index}` }
          >
            <h3 data-testid={ `${index}-recomendation-title` }>
              { title === 'Foods'
                ? elem.strDrink
                : elem.strMeal}
            </h3>
            <img
              src={ title === 'Foods'
                ? elem.strDrinkThumb
                : elem.strMealThumb }
              className="imgs"
              alt="imagem da receita"
            />
          </div>
        ))}
      </div>
      {!storageDone() && (
        <button
          type="button"
          className="start-continue"
          data-testid="start-recipe-btn"
          onClick={ pushDinksAndFoods }
        >
          {startAndContinue()}
        </button>)}

    </div>
  );
}

RecipeDetails.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default RecipeDetails;
