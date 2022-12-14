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
        
        jest.spyOn(global, "fetch").mockImplementation(async (url) => {
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
               case "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=": {
                return {
                  json:() => Promise.resolve(drinksSearch)
            }}
            case "https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977": {
                return {
                  json:() => Promise.resolve(mealLookUp)
            }}
               default: {
                   throw new Error(`Unhandled request: ${url}`);
               }
           }}
           );
          
      await act(async () => {
        renderWithRouter(<Recipes title='Foods'/>);
      });
     
      const corbalink = await (screen.findByTestId("0-card-img"))
      userEvent.click(corbalink)
     
      const { history } = renderWithRouter(<App/>)
      await act(async () => {
        history.push('/foods/52977')
      });
      await waitFor(() => expect(fetch).toBeCalled())
      expect(await screen.findByTestId('share-btn')).toBeInTheDocument()
      expect(await screen.findByText('Lentils 1 cup')).toBeInTheDocument()
      expect(await screen.findByTestId('instructions')).toHaveTextContent('Pick through your lentils for any foreign debris, rinse them 2 or 3 times')  
    })
    

    

    it('quando entramos na receita desejada é rederizado os elementos',async () => {

        jest.spyOn(global, "fetch").mockImplementation(async (url) => {
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
               case "https://www.themealdb.com/api/json/v1/1/search.php?s=": {
                return {
                  json:() => Promise.resolve(mockSearch)
            }}
            case "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997": {
                return {
                  json:() => Promise.resolve(drinkLookUp)
            }}
               default: {
                   throw new Error(`Unhandled request: ${url}`);
               }
           }}
           );
           
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
           
      await act(async () => {
        renderWithRouter(<Recipes title='Drinks'/>);
      });

     
      const GGlink = await (screen.findByTestId("0-card-img"))
      userEvent.click(GGlink)
      
      const { history } = renderWithRouter(<App/>)
      await act(async () => {
        history.push('/drinks/15997')
      });
      await waitFor(() => expect(fetch).toBeCalled())
      expect(await screen.findByText('Galliano 2 1/2 shots')).toBeInTheDocument()
      expect(await screen.findByTestId('instructions')).toHaveTextContent('Pour the Galliano liqueur over ice.')  

    
      const startRecipeBtn = await screen.findByTestId('start-recipe-btn')
      userEvent.click(startRecipeBtn)


      expect(history.location.pathname).toBe('/drinks/15997/in-progress')
      const favoriteBtn = screen.queryByTestId('favorite-btn');
        userEvent.click(favoriteBtn);
    
        expect(JSON.parse(localStorage.getItem(TEST_KEY))).toEqual(JSON.parse(TEST_VALUE))
      });
   
    // it('verifica a chave do local storage das receitas favoritas',async () => {
    //     jest.spyOn(global, "fetch").mockImplementation(async (url) => {
    //     const favoriteBtn = screen.queryByTestId('favorite-btn');
    //     userEvent.click(favoriteBtn);
    //     expect(localStorage.getItem('favoriteRecipes')).toBeTruthy();
    //   })
    // })
})
