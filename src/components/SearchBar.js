import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchContext, LoginContext } from '../context/LoginContext';
import {
  fetchIngredient,
  fetchLetter,
  fetchNome,
  fetchLetterCock,
  fetchNomeCock,
  fetchIngredientCock } from '../helpers/FetchApi';

const sorry = 'Sorry, we haven\'t found any recipes for these filters.';

function SearchBar({ title, history }) {
  const { strSearch } = useContext(LoginContext);
  const { setCards } = useContext(fetchContext);
  const [ingrediente, setIngrediente] = useState(false);
  const [name, setName] = useState(false);
  const [first, setFirst] = useState(false);

  const fetchCheckFoods = async (fetch) => {
    const { meals } = await fetch(strSearch);
    if (meals === null) {
      global.alert(sorry);
    } else {
      if (meals.length === 1) { history.push(`/foods/${meals[0].idMeal}`); }
      setCards(meals);
    }
  };

  const fetchCheckCocks = async (fetch) => {
    const { drinks } = await fetch(strSearch);
    if (drinks === null) {
      global.alert(sorry);
    } else {
      if (drinks.length === 1) { history.push(`/drinks/${drinks[0].idDrink}`); }
      setCards(drinks);
    }
  };

  const fetchFoods = () => {
    if (ingrediente) {
      fetchCheckFoods(fetchIngredient);
    }
    if (name) {
      fetchCheckFoods(fetchNome);
    }
    if (first) {
      if (strSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        fetchCheckFoods(fetchLetter);
      }
    }
  };

  const fetchCocks = async () => {
    if (ingrediente) {
      fetchCheckCocks(fetchIngredientCock);
    }
    if (name) {
      fetchCheckCocks(fetchNomeCock);
    }
    if (first) {
      if (strSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        fetchCheckCocks(fetchLetterCock);
      }
    }
  };

  const ifFecth = () => {
    if (title === 'Foods') fetchFoods();
    if (title === 'Drinks') fetchCocks();
  };

  return (
    <nav>
      <label htmlFor="ingrediente ">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="filters"
          id="ingrediente "
          value={ ingrediente }
          onChange={ ({ target: { checked } }) => {
            setIngrediente(checked);
            setFirst(false);
            setName(false);
          } }
        />
        Ingredient
      </label>
      <label htmlFor="name ">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="filters"
          id="name "
          value={ name }
          onChange={ ({ target: { checked } }) => {
            setName(checked);
            setIngrediente(false);
            setFirst(false);
          } }
        />
        Name
      </label>
      <label htmlFor="first-letter ">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="filters"
          id="first-letter"
          value={ first }
          onChange={ ({ target: { checked } }) => {
            setFirst(checked);
            setIngrediente(false);
            setName(false);
          } }
        />
        First
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ ifFecth }
      >
        Search

      </button>
    </nav>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
export default SearchBar;
