import renderWithRouter from '../helpers/renderWithRouter';
import React, { useEffect } from "react";
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';
import mealCategory from './mocks/meal/mealCategory';
import { act } from 'react-dom/test-utils';
import drinksCategory from './mocks/drinks/drinksCategory';
import mockSearch from './mocks/meal/mockSearch';
import drinksSearch from './mocks/drinks/drinksSearch';
import App from '../App'
import mealLookUp from './mocks/meal/mealLookUp';
import drinkLookUp from './mocks/drinks/drinkLookUp';



describe('Teste da página detalhes das receitas.js', () => {
    it('quando entramos na receita desejada é rederizado os elementos',async () => {
    
    const TEST_KEY = 'favoriteRecipes'

    const TEST_VALUE = JSON.stringify([{
        alcoholicOrNot: "Optional alcohol",
        category: "Ordinary Drink",
        id: "15997",
        image: "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
        name: "GG",
        nationality: "",
        type: "drink", }]);
     
     

      localStorage.setItem(TEST_KEY, TEST_VALUE);

        const { history } = renderWithRouter(<App />);
        await act(async () => {
            history.push('/favorite-recipes');
          });   
        const titlePage = screen.getByRole('heading', { name: /Favorite Recipes/i });
        expect(titlePage).toBeInTheDocument();
        expect(screen.getByText('GG')).toBeInTheDocument()
      })
})
