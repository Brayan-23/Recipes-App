import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';
import mealCategory from './mocks/meal/mealCategory';
import { act } from 'react-dom/test-utils';
import drinksCategory from './mocks/drinks/drinksCategory';
import mealCategoryBeef from './mocks/meal/mealCategoryBeef';
import { fireEvent } from '@testing-library/react';

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
<<<<<<< HEAD
    






























  })
=======

    it('botões de categoria estão sendo rederizados na tela foods',async () => {

      
     
    //   jest.spyOn(global, "fetch").mockImplementation(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve(mealCategory)
    //   })
    // );

      jest.spyOn(global, "fetch").mockImplementation((url,url2) =>{
        url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=beef';
        url2 = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        if(url2){
          return Promise.resolve({
            json: () => Promise.resolve(mealCategory)
          })
        }
        if(url){
          return Promise.resolve({
            json: () => Promise.resolve(mealCategoryBeef)
          })
        }
        }
      );
     
    await act(async () => {
      renderWithRouter(<Recipes title='Foods'/>);

    });
  
   const beef = await screen.findByTestId('Beef-category-filter');
   fireEvent.click(beef);

   expect(await screen.findByText('Beef and Mustard Pie'))
    
  })
})
>>>>>>> 068db4fc02c2e90675dd1e7e8b6895f1c5a8b0b6
