import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
    <div>
      <form>
        <input
          type="email"
          placeholder="digite seu email"
          data-testid="email-input"
          onChange={ handleLogin }
          name="email"
          value={ login.email }
        />
        <input
          type="password"
          placeholder="digite sua senha"
          data-testid="password-input"
          onChange={ handleLogin }
          name="password"
          value={ login.password }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ click }
          onClick={ handleEnter }
        >
          Enter

        </button>
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
