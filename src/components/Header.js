import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
/* import Recipes from './Recipes'; */
import { LoginContext } from '../context/LoginContext';
import '../css/Header.scss';

function Header({ title, history }) {
  const { strSearch, setStrSearch } = useContext(LoginContext);
  const [search, setSearch] = useState(false);

  return (
    <section className="header-section">
      <div className="header">
        <h1 data-testid="page-title">{title}</h1>
        <div className="profile-icon">
          <Link
            to="/profile"
          >
            <img
              src={ profileIcon }
              alt="imagem"
              data-testid="profile-top-btn"
            />
          </Link>
        </div>
        {title === 'Foods'
          && (
            <button
              className="search-button"
              type="button"
              onClick={ () => setSearch(!search) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="imagem" />
            </button>
          ) }
        {title === 'Drinks'
           && (
             <button
               className="search-button"
               type="button"
               onClick={ () => setSearch(!search) }
             >
               <img
                 data-testid="search-top-btn"
                 src={ searchIcon }
                 alt="imagem"
               />
             </button>)}
      </div>
      {search && (
        <label htmlFor="search">
          <input
            className="search-type-input"
            id="search"
            type="text"
            value={ strSearch }
            data-testid="search-input"
            onChange={ ({ target: { value } }) => setStrSearch(value) }
          />
        </label>
      )}

      <SearchBar history={ history } title={ title } />

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
