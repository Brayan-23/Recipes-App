import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App'
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import mealFirstLetterMock from './mocks/meal/mealFirstLetterMock';
import { act } from 'react-dom/test-utils';
import mealIngredientMock from './mocks/meal/mealIngredientMock';
import mealNameMock from './mocks/meal/mealNameMock';
import drinksNameMock from './mocks/drinks/drinksNameMock';
import drinksIngredientMock from './mocks/drinks/drinksIngredientMock';
import drinksFirstLetterMock from './mocks/drinks/drinksFirstLetterMock';

describe('Testes referentes ao SearchBar', () => {
    global.alert = jest.fn();
    it('testa se aparece tudo corretamente na tela', () => {
        renderWithRouter(<SearchBar />)
        expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument()
        expect(screen.getByTestId('name-search-radio')).toBeInTheDocument()
        expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument()
        expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
})


it('testa erro ingredientes de comida', async () => {
    // global.fetch = jest.fn(async () => ({ json: async() =>
    //     mealFirstLetterMock}))

  await act(async () => {
    renderWithRouter(<Header title='Foods' />)})
    const alertMock = jest.spyOn(window,'alert').mockImplementation();
    Object.assign(window.alert,jest.fn());
    const searchBtn =  screen.getByTestId('exec-search-btn');
    const searchInputIcon =  screen.getByTestId('search-top-btn') 
    const ingredientRadio =  screen.getByTestId('ingredient-search-radio')
    
    userEvent.click(searchInputIcon)

    const searchInput =  screen.getByTestId('search-input') 
    
     expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'xablau')
    userEvent.click(ingredientRadio)
    userEvent.click(searchBtn)

    await waitFor(() => expect(alertMock).toBeCalledWith("Sorry, we haven't found any recipes for these filters."))   
 
   
})
});

it('testa erro primeira letra de comida', async () => {
  // global.fetch = jest.fn(async () => ({ json: async() =>
  //     mealFirstLetterMock}))

await act(async () => {
  renderWithRouter(<Header title='Foods' />)})
  Object.assign(window.alert,jest.fn());
  const searchBtn =  screen.getByTestId('exec-search-btn');
  const searchInputIcon =  screen.getByTestId('search-top-btn') 
  const fristRadio =  screen.getByTestId('first-letter-search-radio')
  
  userEvent.click(searchInputIcon)

  const searchInput =  screen.getByTestId('search-input') 
  
   expect(searchInput).toBeInTheDocument();
  userEvent.type(searchInput, 'beatles')
  userEvent.click(fristRadio)
  userEvent.click(searchBtn)

  await waitFor(() => expect(global.alert).toBeCalledWith("Your search must have only 1 (one) character"))   

});


it('testa erro name de Drinks', async () => {
  // global.fetch = jest.fn(async () => ({ json: async() =>
  //     mealFirstLetterMock}))

await act(async () => {
  renderWithRouter(<Header title='Drinks' />)})
  Object.assign(window.alert,jest.fn());
  const searchBtn =  screen.getByTestId('exec-search-btn');
  const searchInputIcon =  screen.getByTestId('search-top-btn') 
  const nameRadio =  screen.getByTestId('name-search-radio')
  
  userEvent.click(searchInputIcon)

  const searchInput =  screen.getByTestId('search-input') 
  
   expect(searchInput).toBeInTheDocument();
  userEvent.type(searchInput, 'beatles')
  userEvent.click(nameRadio)
  userEvent.click(searchBtn)

  await waitFor(() => expect(global.alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters."))   

});


it('testa erro primeira letra de Drinks', async () => {
  // global.fetch = jest.fn(async () => ({ json: async() =>
  //     mealFirstLetterMock}))

await act(async () => {
  renderWithRouter(<Header title='Drinks' />)})
  Object.assign(window.alert,jest.fn());
  const searchBtn =  screen.getByTestId('exec-search-btn');
  const searchInputIcon =  screen.getByTestId('search-top-btn') 
  const fristRadio =  screen.getByTestId('first-letter-search-radio')
  
  userEvent.click(searchInputIcon)

  const searchInput =  screen.getByTestId('search-input') 
  
   expect(searchInput).toBeInTheDocument();
  userEvent.type(searchInput, 'beatles')
  userEvent.click(fristRadio)
  userEvent.click(searchBtn)

  await waitFor(() => expect(global.alert).toBeCalledWith("Your search must have only 1 (one) character"))   

});


it('testa busca por ingredientes de comida', async () => {

    // global.fetch = jest.fn(async () => ({ json: async() =>
    //     mealFirstLetterMock}))

    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
       json: () => Promise.resolve(mealIngredientMock)
 })
);


  await act(async () => {
    renderWithRouter(<Header title='Foods' />)})

    const searchBtn =  screen.getByTestId('exec-search-btn');
    const searchInputIcon =  screen.getByTestId('search-top-btn') 
    const ingredientRadio =  screen.getByTestId('ingredient-search-radio')
    
    userEvent.click(searchInputIcon)

    const searchInput =  screen.getByTestId('search-input') 
    
     expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'egg')
    userEvent.click(ingredientRadio)
    userEvent.click(searchBtn)

    expect(await screen.findByText('Beef Lo Mein'))

})


it('testa busca pela primeira letra de comida', async () => {

    // global.fetch = jest.fn(async () => ({ json: async() =>
    //     mealFirstLetterMock}))

    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
       json: () => Promise.resolve(mealFirstLetterMock)
 })
);


  await act(async () => {
    renderWithRouter(<Header title='Foods' />)})

    const searchBtn =  screen.getByTestId('exec-search-btn');
    const searchInputIcon =  screen.getByTestId('search-top-btn') 
    const fristRadio =  screen.getByTestId('first-letter-search-radio')
    
    userEvent.click(searchInputIcon)

    const searchInput =  screen.getByTestId('search-input') 
    
     expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'a')
    userEvent.click(fristRadio)
    userEvent.click(searchBtn)

    expect(await screen.findByText('Apple Frangipan Tart'))

})

it('testa busca nome da comida', async () => {

    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
       json: () => Promise.resolve(mealNameMock)
 })
);


  await act(async () => {
    renderWithRouter(<Header title='Foods' />)})

    const searchBtn =  screen.getByTestId('exec-search-btn');
    const searchInputIcon =  screen.getByTestId('search-top-btn') 
    const nameRadio =  screen.getByTestId('name-search-radio')
    
    userEvent.click(searchInputIcon)

    const searchInput =  screen.getByTestId('search-input') 
    
     expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Beef')
    userEvent.click(nameRadio)
    userEvent.click(searchBtn)

    expect(await screen.findByText('Beef Lo Mein'))

})

it('testa busca nome do drink', async () => {

    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
       json: () => Promise.resolve(drinksNameMock)
 })
);


  await act(async () => {
    renderWithRouter(<Header title='Drinks' />)})

    const searchBtn =  screen.getByTestId('exec-search-btn');
    const searchInputIcon =  screen.getByTestId('search-top-btn') 
    const nameRadio =  screen.getByTestId('name-search-radio')
    
    userEvent.click(searchInputIcon)

    const searchInput =  screen.getByTestId('search-input') 
    
     expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Wine')
    userEvent.click(nameRadio)
    userEvent.click(searchBtn)

    expect(await screen.findByText('Wine Punch'))

  })


it('testa busca ingrediente do drink', async () => {

    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
       json: () => Promise.resolve(drinksIngredientMock)
 })
);


  await act(async () => {
    renderWithRouter(<Header title='Drinks' />)})

    const searchBtn =  screen.getByTestId('exec-search-btn');
    const searchInputIcon =  screen.getByTestId('search-top-btn') 
    const ingredientRadio =  screen.getByTestId('ingredient-search-radio')    
    userEvent.click(searchInputIcon)

    const searchInput =  screen.getByTestId('search-input') 
    
     expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'gin')
    userEvent.click(ingredientRadio)
    userEvent.click(searchBtn)

    expect(await screen.findByText('69 Special'))

  })

  it('testa busca primeira letra do drink', async () => {

    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
       json: () => Promise.resolve(drinksFirstLetterMock)
 })
);


  await act(async () => {
    renderWithRouter(<Header title='Drinks' />)})

    const searchBtn =  screen.getByTestId('exec-search-btn');
    const searchInputIcon =  screen.getByTestId('search-top-btn') 
    const fristRadio =  screen.getByTestId('first-letter-search-radio')
    
    userEvent.click(searchInputIcon)

    userEvent.click(fristRadio)

    const searchInput =  screen.getByTestId('search-input') 
    
     expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'a')
    userEvent.click(fristRadio)
    userEvent.click(searchBtn)

    expect(await screen.findByText('A1'))

  })



