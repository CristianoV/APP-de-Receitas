import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouterAndRedux from './helper';

describe('Testa a página de perfil', () => {
  it('Verifica se há um email salvo no localStorage', () => {
    renderWithRouterAndRedux(<Profile />);
    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });

  it('Verifica se todos os botões são renderizados  na tela', () => {
    renderWithRouterAndRedux(<Profile />);

    const buttons = 3;
    const button = screen.getAllByRole('button');
    const buttonOne = screen.getByTestId('profile-done-btn');
    const buttonTwo = screen.getByTestId('profile-favorite-btn');
    const buttonTree = screen.getByTestId('profile-logout-btn');

    expect(button).toHaveLength(buttons);
    expect(buttonOne).toBeInTheDocument();
    expect(buttonTwo).toBeInTheDocument();
    expect(buttonTree).toBeInTheDocument();
  });

  it('Clicar nos botões redireciona para as páginas corretas', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);

    const buttonOne = screen.getByTestId('profile-done-btn');
    const buttonTwo = screen.getByTestId('profile-favorite-btn');
    const buttonTree = screen.getByTestId('profile-logout-btn');

    userEvent.click(buttonOne);
    expect(history.location.pathname).toBe('/done-recipes');
    userEvent.click(buttonTwo);
    expect(history.location.pathname).toBe('/favorite-recipes');
    userEvent.click(buttonTree);
    expect(history.location.pathname).toBe('/');
  });
});
