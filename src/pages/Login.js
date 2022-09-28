import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { LoginContext } from '../context/LoginContext';
import '../css/Login.scss';

function Login({ history }) {
  const { userLogin, setUserLogin } = useContext(LoginContext);
  const [loginInput, setLoginInput] = useState('');
  const [loginPassWord, setLoginPassword] = useState('');

  const LoginStorageHandle = () => {
    const objectStorage = JSON.stringify({ email: loginInput });
    localStorage.setItem('user', objectStorage);
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  const validateUser = () => {
    const regexValidate = /\S+@\S+\.\S+/; /// Referencia: https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
    if (regexValidate.test(loginInput) === true && loginPassWord.length > '6') {
      setUserLogin(false);
    } else {
      setUserLogin(true);
    }
  };
  validateUser();

  return (
    <div className="loginPage">
      <form>
        <h1> Login </h1>
        <label htmlFor="email">
          <input
            placeholder="E-mail"
            type="email"
            data-testid="email-input"
            value={ loginInput }
            onChange={ ({ target: { value } }) => setLoginInput(value) }
          />
        </label>
        <label htmlFor="password">
          <input
            placeholder="password"
            type="password"
            data-testid="password-input"
            value={ loginPassWord }
            onChange={ ({ target: { value } }) => setLoginPassword(value) }
          />
        </label>
        <button
          className="buttonLogin"
          type="button"
          data-testid="login-submit-btn"
          disabled={ userLogin }
          onClick={ () => {
            LoginStorageHandle();
            history.push('/foods');
          } }
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
