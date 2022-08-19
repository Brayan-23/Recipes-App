import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [userLogin, setUserLogin] = useState(false);
  return (
    <LoginContext.Provider
      value={ {
        userLogin,
        setUserLogin,
      } }
    >
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node,

}.isRequired;

export default LoginProvider;
