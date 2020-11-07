import React from 'react';
import AuthContext from '../contexts/auth';

const auth = <P extends object>(InnerComponent: React.ComponentType<P>) => (props: P) => {
  return (
    <AuthContext.Consumer>
      {context => (
        <InnerComponent
          {...props}
          isAuthenticated={context.isAuthenticated}
          updateAuthState={context.updateAuthState}
        />
      )}
    </AuthContext.Consumer>
  )
};

export default auth;
