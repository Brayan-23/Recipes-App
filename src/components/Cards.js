import React, { useContext } from 'react';
import PropsTypes from 'prop-types';
import { fetchContext } from '../context/LoginContext';
import '../css/cards.css';

function Cards({ title }) {
  const { cards } = useContext(fetchContext);

  const cardsDrinks = () => {
    const number11 = 11;
    const cardsFilter = cards.filter((elem, index) => index <= number11 && elem);
    console.log(cardsFilter);
    return cardsFilter.map(({ strDrink, strDrinkThumb }, index) => (
      <div key={ `${strDrink} ${index} ` } data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{strDrink}</h3>
        <img
          className="cards-img"
          alt="imagem do Alimento"
          src={ strDrinkThumb }
          data-testid={ `${index}-card-img` }
        />
      </div>
    ));
  };

  const cardsFoods = () => {
    const number11 = 11;
    const cardsFilter = cards.filter((elem, index) => index <= number11 && elem);
    console.log(cardsFilter);

    return cardsFilter.map(({ strMeal, strMealThumb }, index) => (
      <div key={ `${strMeal} ${index} ` } data-testid={ `${index}-recipe-card` }>
        <h3 data-testid={ `${index}-card-name` }>{strMeal}</h3>
        <img
          className="cards-img"
          src={ strMealThumb }
          alt="imagem do Alimento"
          data-testid={ `${index}-card-img` }
        />
      </div>
    ));
  };

  const renderFunctions = () => {
    if (title === 'Foods') { return cardsFoods(); }
    if (title === 'Drinks') { return cardsDrinks(); }
  };

  return (
    <section>
      {renderFunctions()}
    </section>
  );
}

Cards.propTypes = {
  title: PropsTypes.string,
}.isrequired;

export default Cards;
