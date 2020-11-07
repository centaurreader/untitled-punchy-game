import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  updateAuthState: (v: boolean) => {},
});

export default AuthContext;
