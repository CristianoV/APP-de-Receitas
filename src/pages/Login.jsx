import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../Components/CSS/Login.module.css';
import Panelinha from '../images/panelinha.svg';

function Login(props) {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [click, setClick] = useState(true);

  const handleLogin = ({ target }) => {
    const { name, value } = target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  useEffect(() => {
    const rule = 6;
    const regexEmail = /\S+@\S+\.\S+/.test(login.email);
    if (regexEmail && login.password.length > rule) {
      setClick(false);
    } else {
      setClick(true);
    }
  }, [login]);

  const localSetItem = () => {
    const NEW_TOKEN = 1;
    localStorage.setItem('mealsToken', NEW_TOKEN);
    localStorage.setItem('cocktailsToken', NEW_TOKEN);
    const user = { email: login.email };
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleEnter = () => {
    const { history } = props;
    localSetItem();
    history.push('/foods');
  };

  return (
    <div className={ style.container }>
      <header>
        <img src={ Panelinha } alt="" />
        <p>YourFOOD</p>
      </header>
      <h2>Gestor de Pedidos</h2>
      <p>Insira seu usuário e senha para se conectar</p>
      <form>
        <label htmlFor="user">
          Usuário
          <input
            type="email"
            id="user"
            placeholder="Usuário"
            data-testid="email-input"
            onChange={ handleLogin }
            name="email"
            value={ login.email }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ handleLogin }
            name="password"
            value={ login.password }
          />
        </label>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ click }
          onClick={ handleEnter }
        >
          Entrar
        </button>
        <p>Create account</p>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
