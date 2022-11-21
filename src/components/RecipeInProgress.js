import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchItemCock, fetchItemFood } from '../helpers/FetchApi';
import Buttons from './Buttons';
import '../css/Details.scss';

function RecipeInProgress({ title, match: { params: { id } } }) {
  const history = useHistory();
  const [details, setDetails] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [copyUrl, setCopyUrl] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [checkBox, setCheckBox] = useState({});
  const [btnFinish, setBtnFinish] = useState(true);

  const filterIngredientsAndMeasure = (chaves) => {
    const filterIngredient = chaves
      .filter((elem) => elem[0].includes('strIngredient')
      && elem[1] !== '' && elem[1] !== null && elem[1] !== ' ');
    const filterMeasure = chaves.filter((elem) => elem[0].includes('strMeasure')
  && elem[1] !== ' ' && elem[1] !== null && elem[1] !== '');
    return [filterIngredient, filterMeasure];
  };

  const reduceFunction = (nada) => nada.reduce((acc, curr, index) => {
    if (index === 0) {
      acc = { [curr]: true };
    } else {
      acc = { ...acc, [curr]: true };
    }
    return acc;
  }, {});

  const checkboxReturnLocal = () => {
    const getLocalProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalProgress !== null) {
      if (title === 'Foods' && getLocalProgress.meals[id]) {
        const nada = getLocalProgress.meals[id];
        setCheckBox(reduceFunction(nada));
      }
      if (title === 'Drinks' && getLocalProgress.cocktails[id]) {
        const nada = getLocalProgress.cocktails[id];
        setCheckBox(reduceFunction(nada));
      }
    }
  };

  useEffect(() => {
    checkboxReturnLocal();
    const result = async () => {
      if (title === 'Drinks') {
        const { drinks } = await fetchItemCock(id);
        const chaves = Object.entries(drinks[0]);
        console.log(chaves);
        setIngr(filterIngredientsAndMeasure(chaves)[0]);
        setMeasure(filterIngredientsAndMeasure(chaves)[1]);
        setCopyUrl(`http://localhost:3000/drinks/${id}`);
        setDetails(drinks[0]);
      }
      if (title === 'Foods') {
        const { meals } = await fetchItemFood(id);
        const chaves = Object.entries(meals[0]);
        setIngr(filterIngredientsAndMeasure(chaves)[0]);
        setMeasure(filterIngredientsAndMeasure(chaves)[1]);
        console.log(filterIngredientsAndMeasure(chaves)[1]);
        setCopyUrl(`http://localhost:3000/foods/${id}`);
        setDetails(meals[0]);
      }
    };
    result();
  }, [id]);

  const ifLocal = () => {
    if (title === 'Foods') {
      const obj = {
        cocktails: {},
        meals: { [id]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
    if (title === 'Drinks') {
      const obj = {
        meals: {},
        cocktails: { [id]: [] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  };

  const checkButtonFinish = () => {
    const getLocalProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalProgress === null) { return true; }
    if (getLocalProgress.meals[id] || getLocalProgress.cocktails[id]) {
      const recipes = title === 'Foods'
        ? getLocalProgress.meals[id]
        : getLocalProgress.cocktails[id];
      if (recipes.length === ingr.length) {
        setBtnFinish(false);
      } else { setBtnFinish(true); }
    }
  };

  useEffect(() => {
    const getLocalProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getLocalProgress === null) {
      ifLocal();
    }
    if (getLocalProgress !== null) {
      if (title === 'Foods' && ingredient !== '') {
        const obj = {
          ...getLocalProgress,
          meals: { ...getLocalProgress.meals,
            [id]: id in getLocalProgress.meals
              ? [...getLocalProgress.meals[id], ingredient]
              : [ingredient] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      }
      if (title === 'Drinks' && ingredient !== '') {
        const obj = {
          ...getLocalProgress,
          cocktails: { ...getLocalProgress.cocktails,
            [id]: id in getLocalProgress.cocktails
              ? [...getLocalProgress.cocktails[id], ingredient]
              : [ingredient] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      }
    }
    checkButtonFinish();
  }, [ingredient]);

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
        <Buttons url={ copyUrl } title={ title } id={ id } />
        <img
          src={ title === 'Foods'
            ? details.strMealThumb
            : details.strDrinkThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
          className="recipe-img"
        />
      </div>
      <h2>
        Instruções
      </h2>
      <p
        className="instructions"
        data-testid="instructions"
      >
        {details.strInstructions}

      </p>
      <h2>
        Ingredientes
      </h2>
      <section
        className="ingredients-details"
      >
        {ingr.map((elem, index) => (
          <label
            key={ `checkbox ${index}` }
            data-testid={ `${index}-ingredient-step` }
            htmlFor={ `check ${index}` }
          >
            <input
              type="checkbox"
              id={ `check ${index}` }
              checked={ checkBox[elem[1]] }
              onChange={ () => (
                setIngredient(elem[1])) }
            />
            {`${elem[1]} ${measure[index] && measure[index][1]}`}
          </label>
        ))}
      </section>
      <button
        className="start-continue"
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ btnFinish }
        onClick={ () => history.push('/done-recipes') }
      >
        Finish Recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default RecipeInProgress;
