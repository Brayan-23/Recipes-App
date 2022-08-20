import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import Cards from './Cards';
import { LoginContext } from '../context/LoginContext';

function Header({ title, history }) {
  const { strSearch, setStrSearch } = useContext(LoginContext);
  const [search, setSearch] = useState(false);

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
      <SearchBar history={ history } title={ title } />
      <Cards title={ title } />

    </section>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Header;
