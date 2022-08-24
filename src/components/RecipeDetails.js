import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Buttons from './Buttons';
import {
  fetchItemCock,
  fetchItemFood,
  fetchCocksAll,
  fetchFoodsAll } from '../helpers/FetchApi';
import '../css/recipeDetails.css';

const START_RECICPE = 'Start Recipe';

function RecipeDetails({ title, match: { params: { id } } }) {
  const history = useHistory();
  const [details, setDetails] = useState({});
  const [ingr, setIngr] = useState([]);
  const [btn] = useState(true);
  const [recomendations, setRecomendations] = useState([]);
  const [copyUrl, setCopyUrl] = useState('');

  useEffect(() => {
    const result = async () => {
      if (title === 'Drinks') {
        const { drinks } = await fetchItemCock(id);
        const chaves = Object.entries(drinks[0]);
        setCopyUrl(`http://localhost:3000/drinks/${id}`);
        setIngr(chaves);
        setDetails(drinks[0]);
      }
      if (title === 'Foods') {
        const { meals } = await fetchItemFood(id);
        const chaves = Object.entries(meals[0]);
        setCopyUrl(`http://localhost:3000/foods/${id}`);
        setIngr(chaves);
        setDetails(meals[0]);
      }
    };
    result();
  }, []);

  useEffect(() => {
    const result = async () => {
      const number5 = 5;
      if (title === 'Drinks') {
        const { meals } = await fetchFoodsAll();
        const filter = meals.filter((elem, index) => index <= number5 && elem);
        setRecomendations(filter);
      }
      if (title === 'Foods') {
        const { drinks } = await fetchCocksAll();
        const filter = drinks.filter((elem, index) => index <= number5 && elem);
        setRecomendations(filter);
      }
    };
    result();
  }, []);

  const ingredients = () => {
    const filterIngredient = ingr
      .filter((elem) => elem[0].includes('strIngredient'));
    const filterMeasure = ingr.filter((elem) => elem[0].includes('strMeasure'));
    return (
      <section>
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

  const startAndContinue = () => {
    const progress = localStorage.getItem('inProgressRecipes');
    if (progress === null) { return START_RECICPE; }
    if (progress[id] && title === 'Foods') {
      return 'Continue Recipe';
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
      <h1 data-testid="recipe-title">
        {title === 'Foods'
          ? details.strMeal
          : details.strDrink}
      </h1>
      {title === 'Foods'
        ? <h3 data-testid="recipe-category">{details.strCategory}</h3>
        : <h3 data-testid="recipe-category">{details.strAlcoholic}</h3> }
      <Buttons id={ id } title={ title } url={ copyUrl } />
      <img
        src={ title === 'Foods'
          ? details.strMealThumb
          : details.strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
        className="recipe-img"
      />
      <p data-testid="instructions">{details.strInstructions}</p>
      {title === 'Foods'
      && <iframe
        width="350"
        height="400"
        data-testid="video"
        src={ details.strYoutube }
        title="YouTube video player"
        allowFullScreen
      />}
      {ingredients()}
      <p>nada</p>
      <div className="carousel">
        {recomendations.map((elem, index) => (
          <div
            className="item"
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
      {btn && (
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
