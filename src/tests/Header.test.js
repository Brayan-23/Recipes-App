import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App'
import Drinks from '../pages/Drinks'

describe('Testes referentes ao Header', () => {
    it('Testa se aparece tudo corretmente', () => {
        renderWithRouter(<App />)
        const emailInput= screen.getByTestId('email-input')
        const passwordInput= screen.getByTestId('password-input')
        const buttonInput= screen.getByTestId('login-submit-btn')
   
        userEvent.type(emailInput, 'test@gmail.com')
        userEvent.type(passwordInput, '1234567')
        userEvent.click(buttonInput)
        expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument()
        const buttonSearch = screen.getByTestId('search-top-btn')
        userEvent.click(buttonSearch)
        expect(screen.getByTestId('search-input')).toBeVisible();
    })
    it('Testa funcionalidade do botão com a lupa', () => {
        renderWithRouter(<Drinks />)
        expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument()
        const buttonSearch = screen.getByTestId('search-top-btn')
        userEvent.click(buttonSearch)
        const searchInput =  screen.getByTestId('search-input')
        userEvent.type(searchInput, 'xablau')
        expect(searchInput).toBeVisible();
    })
    it('Testa buscas', () => {
       
       
       
       
        renderWithRouter(<Drinks />)

        expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument()
        const buttonSearch = screen.getByRole('button')
        userEvent.click(buttonSearch)
        const searchInput =  screen.getByTestId('search-input')
        userEvent.type(searchInput, 'xablau')
        expect(searchInput).toBeVisible();
    })
})