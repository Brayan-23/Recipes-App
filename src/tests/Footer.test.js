import renderWithRouter from '../helpers/renderWithRouter';
import React from "react";
import { screen } from '@testing-library/dom';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';

describe('Teste componente footer', () => {
    it('testa se os icones estão sendo rederizados na tela', () => {
      renderWithRouter(<Footer />);
    
      expect(screen.getAllByTestId('food-bottom-btn'))
      expect(screen.getAllByTestId('drinks-bottom-btn'))
    })
})