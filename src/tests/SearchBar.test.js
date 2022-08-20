import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App'
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

describe('Testes referentes ao SearchBar', () => {
    it('testa se aparece tudo corretamente na tela', () => {
        renderWithRouter(<SearchBar />)
        expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument()
        expect(screen.getByTestId('name-search-radio')).toBeInTheDocument()
        expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument()
        expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
})
it('testa se aparece tudo corretamente na tela', () => {
    renderWithRouter(<Header title='Foods' />)
    const ingredientRadio = screen.getByTestId('ingredient-search-radio')
    const nameRadio = screen.getByTestId('name-search-radio')
    const letterRadio = screen.getByTestId('first-letter-search-radio')
    const searchBtn = screen.getByTestId('exec-search-btn');
    const searchInput =  screen.getByTestId('search-input')
    userEvent.type(searchInput, 'chicken')
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);
    expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();

})

});