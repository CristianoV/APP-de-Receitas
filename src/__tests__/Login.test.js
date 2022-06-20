import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helper';
import * as id from './helper/testId';

describe('Testando o componente Login', () => {
  it('Testando os input', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(id.ID_EMAIL);
    const password = screen.getByTestId(id.ID_PASSAWORD);
    const button = screen.getByTestId(id.ID_ENTER);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('Realize as seguintes verificações nos campos de email, senha e botão:', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const button = screen.getByTestId(id.ID_ENTER);
    const email = screen.getByTestId(id.ID_EMAIL);
    const password = screen.getByTestId(id.ID_PASSAWORD);

    expect(history.location.pathname).toBe('/');

    expect(button.disabled).toBe(true);
    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '123456');
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    expect(history.location.pathname).toBe('/food');
  });
});
