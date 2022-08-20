import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import React from 'react';
import LoginProvider from '../context/LoginProvider';
import FetchProvider from '../context/fetchProvider';

export default function renderWithRouter(
  component,
  {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = {},
) {
  return {
    ...render(
      <FetchProvider>
        <LoginProvider>
          <Router history={ history }>
            { component }
          </Router>
        </LoginProvider>
      </FetchProvider>,
    ),
    history,
  };
}
