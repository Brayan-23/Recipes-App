import React, { useContext, useEffect, useState } from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchContext } from '../context/LoginContext';
import {
  fetchFoodsAll,
  fetchCocksAll,
  fetchCategoryCock,
  fetchCategoryFood,
  fetchCocksCategory,
  fetchFoodsCategory } from '../helpers/FetchApi';
import '../css/Recipes.scss';

function Recipes({ title }) {
  const {
    cards,
    setCards,
    categories,
    setCategories,
    setOriginalFoods,
    setOriginalCocks,
    originalFoods,
    originalCocks } = useContext(fetchContext);
  const [boolFoods, setBoolFoods] = useState(false);
  const [boolDrinks, setBoolDrinks] = useState(false);

  useEffect(() => {
    const newCards = async () => {
      const number4 = 4;
      if (title === 'Foods') {
        const foods = await fetchFoodsAll();
        const { meals } = await fetchCategoryFood();
        const filterFoods = meals.filter((elem, index) => index <= number4 && elem);
        setCategories(filterFoods);
        setCards(foods.meals);
        // console.log(foods.meals);
        setOriginalFoods(foods.meals);
      }
      if (title === 'Drinks') {
        const cocks = await fetchCocksAll();
        const { drinks } = await fetchCategoryCock();
        // console.log(drinks);
        const filterCocks = drinks.filter((elem, index) => index <= number4 && elem);
        // console.log(filterCocks);
        setCategories(filterCocks);
        setCards(cocks.drinks);
        setOriginalCocks(cocks.drinks);
      }
    };
    newCards();
  }, []);

  const categoryFoodsAndCocks = async (category) => {
    if (title === 'Foods') {
      if (boolFoods) {
        setCards(originalFoods);
        setBoolFoods(false);
      } else {
        const { meals } = await fetchFoodsCategory(category);
        setCards(meals);
        setBoolFoods(true);
      }
    }
    if (title === 'Drinks') {
      if (boolDrinks) {
        setCards(originalCocks);
        setBoolDrinks(false);
      } else {
        const { drinks } = await fetchCocksCategory(category);
        setCards(drinks);
        setBoolDrinks(true);
      }
    }
  };

  const cardsDrinks = () => {
    const number11 = 11;
    const cardsFilter = cards.filter((elem, index) => index <= number11 && elem);
    // console.log(cardsFilter);
    return cardsFilter.map(({ strDrink, strDrinkThumb, idDrink }, index) => (
      <div
        className="card-food"
        key={ `${strDrink} ${index} ` }
        data-testid={ `${index}-recipe-card` }
      >
        <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
        <Link to={ `/drinks/${idDrink}` }>
          <img
            className="cards-img"
            alt="imagem do Alimento"
            src={ strDrinkThumb }
            data-testid={ `${index}-card-img` }
          />
        </Link>
      </div>
    ));
  };

  const cardsFoods = () => {
    const number11 = 11;
    // console.log(cards);
    const cardsFilter = cards.filter((elem, index) => index <= number11 && elem);
    // console.log(cardsFilter);
    return cardsFilter.map(({ strMeal, strMealThumb, idMeal }, index) => (
      <div
        className="card-food"
        key={ `${strMeal} ${index} ` }
        data-testid={ `${index}-recipe-card` }
      >
        <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
        <Link to={ `/foods/${idMeal}` }>
          <img
            className="cards-img"
            src={ strMealThumb }
            alt="imagem do Alimento"
            data-testid={ `${index}-card-img` }
          />
        </Link>
      </div>
    ));
  };

  const renderFunctions = () => {
    if (title === 'Foods') { return cardsFoods(); }
    if (title === 'Drinks') { return cardsDrinks(); }
  };

  const nada = () => {
    if (title === 'Foods') {
      // console.log(originalFoods);
      setCards(originalFoods);
    }
    if (title === 'Drinks') {
      setCards(originalCocks);
    }
  };

  return (
    <section>
      <div className="div-buttons">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ nada }
        >
          All

        </button>
        {categories.map((elem, index) => (
          <div key={ `${elem.strCategory} ${index}` }>
            <button
              type="button"
              data-testid={ `${elem.strCategory}-category-filter` }
              onClick={ () => categoryFoodsAndCocks(elem.strCategory) }
            >
              {elem.strCategory}

            </button>
          </div>
        ))}
      </div>
      <div className="foodcard">
        {renderFunctions()}
      </div>
    </section>
  );
}

Recipes.propTypes = {
  title: PropsTypes.string,
}.isrequired;

export default Recipes;
