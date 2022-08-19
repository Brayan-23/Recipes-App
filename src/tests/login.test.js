import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen } from '@testing-library/dom';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Teste da página Login.js', () => {
    it('há um campo input para email na tela', () => {
      renderWithRouter(<App />);
        
      expect(screen.getByTestId('email-input')).toBeInTheDocument()
      expect(screen.getByTestId('password-input')).toBeInTheDocument()
      expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument()
    })

    it('testa se o bottão está desabilitado', () => {
        renderWithRouter(<App />);
     const emailInput= screen.getByTestId('email-input')
     const passwordInput= screen.getByTestId('password-input')
     const buttonInput= screen.getByTestId('login-submit-btn')

     expect(buttonInput).toBeDisabled()

     userEvent.type(emailInput, 'test@gmail.com')
     userEvent.type(passwordInput, '1234567')
    
     expect(buttonInput).not.toBeDisabled()
      })


      it('testa se o bottão redireciona para pagina', () => {
        renderWithRouter(<App />);
     const emailInput= screen.getByTestId('email-input')
     const passwordInput= screen.getByTestId('password-input')
     const buttonInput= screen.getByTestId('login-submit-btn')

     userEvent.type(emailInput, 'test@gmail.com')
     userEvent.type(passwordInput, '1234567')
     userEvent.click(buttonInput)

     expect(screen.getByText("Foods")).toBeInTheDocument()
      })
})