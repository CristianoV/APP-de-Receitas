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
    expect(button).toHaveLength(buttons);
  });

  it('Verifica se há um botão "Done Recipes"', () => {
    renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-done-btn');
    expect(button).toBeInTheDocument();
  });

  it('Verifica se há um botão "Favorite Recipes"', () => {
    renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-favorite-btn');
    expect(button).toBeInTheDocument();
  });

  it('Verifica se há um botão "Logout"', () => {
    renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-logout-btn');
    expect(button).toBeInTheDocument();
  });

  it('Clicar no botão de "Done Recipes" redireciona para a página Done Recipes', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-done-btn');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Clicar no botão "Favorite Recipes" leva para a página Favorite Recipes', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-favorite-btn');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Clicar no botão "Logout" redireciona para a tela de Login', () => {
    const { history } = renderWithRouterAndRedux(<Profile />);
    const button = screen.getByTestId('profile-logout-btn');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/');
  });
});
