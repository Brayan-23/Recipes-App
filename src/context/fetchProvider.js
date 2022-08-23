import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchContext } from './LoginContext';

function FetchProvider({ children }) {
  const [originalFoods, setOriginalFoods] = useState([]);
  const [originalCocks, setOriginalCocks] = useState([]);
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);
  return (
    <fetchContext.Provider
      value={ {
        cards,
        setCards,
        categories,
        setCategories,
        originalCocks,
        originalFoods,
        setOriginalCocks,
        setOriginalFoods,
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
