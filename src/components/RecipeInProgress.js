import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchItemCock, fetchItemFood } from '../helpers/FetchApi';
import Buttons from './Buttons';

function RecipeInProgress({ title, match: { params: { id } } }) {
  const [details, setDetails] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [copyUrl, setCopyUrl] = useState('');
  /*     const [test, setTest] = useState({}); */
  const [objChecks, setObjChecks] = useState([]);

  const ifLocal = () => {
    if (title === 'Foods') {
      const obj = {
        cocktails: {},
        meals: { [id]: objChecks },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    if (title === 'Drinks') {
      const obj = {
        meals: {},
        cocktails: { [id]: objChecks },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  };

  useEffect(() => {
    const getLocalProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalProgress === null) {
      ifLocal();
    }
    if (getLocalProgress !== null) {
      if (title === 'Foods') {
        const nada = [...new Set(objChecks)];
        const obj = {
          ...getLocalProgress,
          meals: { ...getLocalProgress.meals, [id]: nada },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      }
      if (title === 'Drinks') {
        const nada = [...new Set(objChecks)];
        const obj = {
          ...getLocalProgress,
          cocktails: { ...getLocalProgress.cocktails, [id]: nada },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      }
    }
  }, [objChecks]);

  useEffect(() => {
    const result = async () => {
      if (title === 'Drinks') {
        const { drinks } = await fetchItemCock(id);
        const chaves = Object.entries(drinks[0]);
        console.log(drinks[0]);
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

  const returnLocal = (elem) => {
    const getLocalProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalProgress !== null) {
      if (title === 'Foods') {
        console.log(elem);
        console.log(getLocalProgress.meals[id].includes(elem));
      }
      if (title === 'Drinks') {
        return getLocalProgress.cocktails[id].includes(elem);
      }
    }
  };

  const ingredients = () => {
    const filterIngredient = ingr
      .filter((elem) => elem[0].includes('strIngredient'));
    const filterMeasure = ingr.filter((elem) => elem[0].includes('strMeasure'));
    return (
      <section>
        {filterIngredient.map((elem, index) => (
          elem[1]
          && (
            <label
              htmlFor={ `check ${index}` }
              key={ `inputs ingredients check ${index}` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                value={ returnLocal(elem[1]) }
                id={ `check ${index}` }
                onChange={ () => (
                  setObjChecks([...objChecks, elem[1]])) }
              />
              {`${elem[1]} ${filterMeasure[index][1]}`}
            </label>
          )
        ))}
      </section>
    );
  };

  return (
    <div>
      <h1 data-testid="recipe-title">
        {title === 'Foods'
          ? details.strMeal
          : details.strDrink}
      </h1>
      {title === 'Foods'
        ? <h3 data-testid="recipe-category">{details.strCategory}</h3>
        : <h3 data-testid="recipe-category">{details.strAlcoholic}</h3> }
      <Buttons url={ copyUrl } title={ title } id={ id } />
      <img
        src={ title === 'Foods'
          ? details.strMealThumb
          : details.strDrinkThumb }
        alt="imagem da receita"
        data-testid="recipe-photo"
        className="recipe-img"
      />
      <p data-testid="instructions">{details.strInstructions}</p>
      {ingredients()}
      <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
