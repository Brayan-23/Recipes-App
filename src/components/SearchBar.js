import React from 'react';

function SearchBar() {
  return (
    <nav>
      <label htmlFor="ingrediente ">
        <input type="radio" data-testid="ingredient-search-radio" id="ingrediente " />
        Ingredient
      </label>
      <label htmlFor="name ">
        <input type="radio" data-testid="name-search-radio" id="name " />
        Name
      </label>
      <label htmlFor="first-letter ">
        <input type="radio" data-testid="first-letter-search-radio" id="first-letter" />
        First Letter
      </label>
      <button type="button" data-testid="exec-search-btn">Search</button>
    </nav>
  );
}

export default SearchBar;
