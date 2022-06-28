import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helper';
import * as id from './helper/testId';

describe('Testando a Pagina principal', () => {
  it('verifiacando o direcionamento correto da pagina', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailValid = id.VALID_EMAIL;
    const passwordValid = id.VALID_PASSWORD;
    const email = screen.getByTestId(id.ID_EMAIL);
    const password = screen.getByTestId(id.ID_PASSAWORD);
    const button = screen.getByTestId(id.ID_ENTER);

    expect(history.location.pathname).toBe('/');

    userEvent.type(email, emailValid);
    userEvent.type(password, passwordValid);
    userEvent.click(button);

    expect(history.location.pathname).toBe('/foods');
    const ruleCards = 12;
    for (let i = 0; i < ruleCards; i += 1) {
      const cards = screen.getByTestId(`${i}-recipe-card`);
      expect(cards).toBeInTheDocument();
    }
  });
});
