import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [search, setSearch] = useState(false);
  const [strSearch, setStrSearch] = useState('');

  return (
    <section>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/profile">
        <img src={ profileIcon } alt="imagem" data-testid="profile-top-btn" />
      </Link>
      {title === 'Foods'
      && (
        <button type="button" onClick={ () => setSearch(!search) }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="imagem" />
        </button>
      ) }
      {title === 'Drinks'
       && (
         <button type="button" onClick={ () => setSearch(!search) }>
           <img
             data-testid="search-top-btn"
             src={ searchIcon }
             alt="imagem"
           />
         </button>)}
      {search && (
        <label htmlFor="search">
          <input
            id="search"
            type="text"
            value={ strSearch }
            data-testid="search-input"
            onChange={ ({ target: { value } }) => setStrSearch(value) }
          />
        </label>
      )}

    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
