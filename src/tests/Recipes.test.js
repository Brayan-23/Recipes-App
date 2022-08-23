import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';
import mealCategory from './mocks/meal/mealCategory';
import { act } from 'react-dom/test-utils';
import drinksCategory from './mocks/drinks/drinksCategory';

describe('Teste da página receitas.js', () => {
    it('botões de categoria estão sendo rederizados na tela foods',async () => {
     
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mealCategory)
        })
      );

      await act(async () => {
        renderWithRouter(<Recipes title='Foods'/>);
      });
      expect(screen.getByTestId('All-category-filter'))
      expect(screen.getByTestId('Beef-category-filter'))
      expect(screen.getByTestId('Breakfast-category-filter'))
      expect(screen.getByTestId('Chicken-category-filter'))
      expect(screen.getByTestId('Dessert-category-filter'))
      expect(screen.getByTestId('Goat-category-filter'))
    })

    it('botões de categoria estão sendo rederizados na tela Drinks',async () => {
     
        jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(drinksCategory)
        })
      );

      await act(async () => {
        renderWithRouter(<Recipes title='Drinks'/>);
      });

      
      expect(screen.getByTestId('All-category-filter'))
      expect(screen.findByTestId('Ordinary Drink-category-filter'))
      expect(screen.getByTestId('Cocktail-category-filter'))
      expect(screen.getByTestId('Shake-category-filter'))
      expect(screen.getByTestId('Other/Unknown-category-filter'))
      expect(screen.getByTestId('Cocoa-category-filter'))
    })
})