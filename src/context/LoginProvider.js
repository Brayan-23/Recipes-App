import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LoginContext } from './LoginContext';

function LoginProvider({ children }) {
  const [userLogin, setUserLogin] = useState(false);
  const [strSearch, setStrSearch] = useState('');
  return (
    <LoginContext.Provider
      value={ {
        userLogin,
        setUserLogin,
        strSearch,
        setStrSearch,
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
