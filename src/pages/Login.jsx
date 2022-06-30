import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from '../Components/CSS/Login.module.css';

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
      <img src="https://s3-alpha-sig.figma.com/img/39d7/c3de/8b6b8d8643b1c235049af9ced9253fa1?Expires=1657497600&Signature=BXDPDKfE4Aq~8AwlJyU~oKGFPQ4m4EqWMxyxmpkyNKQMkouL4b2QDwNf8SlV4pHw6e5CVfOr2oFCqFyQDxAbV9g4gIX1WIs9O5UHRDbfBZ552AcKObFKAQX2qi2HGbTf~KBiTnttod4yPhICUj~x3ttyL1lbM1qchAkdgTDBm8h6qmiWPESImculFVazLaGIJ5V2fRIaS-OnURHTCF7sX3x58SEko42VTaucMO1SxzvLRYUim44-dI4humhYglHkxMSCMWztamguSL6SBzFH8QdHFNsHaQowFFJ0dZ820jA-noTkk-1BfK9n4LbFLllLRpFinMO8Lpgr3-n33aIv7A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" />
      <h1>Welcome to Gostosin</h1>
      <form>
        <input
          type="email"
          placeholder="User"
          data-testid="email-input"
          onChange={ handleLogin }
          name="email"
          value={ login.email }
        />
        <input
          type="password"
          placeholder="Password"
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
        Create account
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
