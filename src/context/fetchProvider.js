import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchContext } from './LoginContext';

function FetchProvider({ children }) {
  const [cards, setCards] = useState([]);
  return (
    <fetchContext.Provider
      value={ {
        cards,
        setCards,
      } }
    >
      {children}
    </fetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default FetchProvider;
