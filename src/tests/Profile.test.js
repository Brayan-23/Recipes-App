import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen } from '@testing-library/dom';
import Profile from '../pages/Profile';
import userEvent from '@testing-library/user-event';

describe('Teste o componente profile', () => {
    it('testa se aparece na tela o email e 3 botoes e redireciona para os caminhos respectivos', () => {

      const setEmail = {
        email: 'teste@teste.com',
      }
      localStorage.setItem('user', JSON.stringify(setEmail));

      const {history} = renderWithRouter(<Profile />);

      const doneButton = screen.getByRole('button', { name:/done/i});
      expect(doneButton).toBeInTheDocument();
      userEvent.click(doneButton);
      expect(history.location.pathname).toBe('/done-recipes');

      const favoriteButton = screen.getByRole('button', { name:/favorite/i});
      expect(favoriteButton).toBeInTheDocument();
      userEvent.click(favoriteButton);
      expect(history.location.pathname).toBe('/favorite-recipes');

      const logoutButton = screen.getByRole('button', { name:/logout/i});
      expect(logoutButton).toBeInTheDocument();
      userEvent.click(logoutButton);
      expect(history.location.pathname).toBe('/');
     
    
     
    
   
    })
})