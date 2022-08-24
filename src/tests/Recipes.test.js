import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Recipes from '../components/Recipes';
import mealCategory from './mocks/meal/mealCategory';
import { act } from 'react-dom/test-utils';
import drinksCategory from './mocks/drinks/drinksCategory';
import mealCategoryBeef from './mocks/meal/mealCategoryBeef';
import { fireEvent } from '@testing-library/react';
import mockSearch from './mocks/meal/mockSearch';
import drinksSearch from './mocks/drinks/drinksSearch';
import drinksCategoryShake from './mocks/drinks/drinksCategoryShake';



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
        it('botões de categoria estão sendo rederizados na tela foods',async () => {
      
        jest.spyOn(global, "fetch").mockImplementation( async (url) => {
         console.log(url)
          switch (url) {
            case "https://www.themealdb.com/api/json/v1/1/search.php?s=": {
              return {
                json:() => Promise.resolve(mockSearch)
          }}
            case "https://www.themealdb.com/api/json/v1/1/list.php?c=list": {
              return {
                json: () => Promise.resolve(mealCategory)
          }}
            case "https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef": {
                return {
                  json:() => Promise.resolve(mealCategoryBeef)
            }}
            
            default: {
                throw new Error(`Unhandled request: ${url}`);
            }
        }}
        );
       
      await act(async () => {
        renderWithRouter(<Recipes title='Foods'/>);
  
      });
        
     const beef = await screen.findByTestId('Beef-category-filter');
     fireEvent.click(beef);   

     expect(await screen.findByText('Beef'))

     const all = await screen.findByTestId('All-category-filter');

     fireEvent.click(all);

     expect(await screen.findByText('Corba'));
      
    })

    it('botões de categoria estão sendo rederizados na tela drinks',async () => {
      
      jest.spyOn(global, "fetch").mockImplementation( async (url) => {
       console.log(url)
        switch (url) {
          case "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=": {
            return {
              json:() => Promise.resolve(drinksSearch)
        }}
          case "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list": {
            return {
              json: () => Promise.resolve(drinksCategory)
        }}
          case "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake": {
              return {
                json:() => Promise.resolve(drinksCategoryShake)
          }}
          
          default: {
              throw new Error(`Unhandled request: ${url}`);
          }
      }}
      );
     
    await act(async () => {
      renderWithRouter(<Recipes title='Drinks'/>);

    });
      
   const Shake = await screen.findByTestId('Shake-category-filter');
   fireEvent.click(Shake);   

   expect(await screen.findByText('Avalanche'))

   const all = await screen.findByTestId('All-category-filter');

   fireEvent.click(all);

   expect(await screen.findByText('GG'));
    
  })
  })












