import React from 'react';
import AuthContext from '../contexts/auth';

interface AuthProps {
  isAuthenticated: boolean;
  updateAuthState: (s: boolean) => void;
}

const auth = <P extends object>(InnerComponent: React.ComponentType<P>): React.FC<Omit<P, keyof AuthProps>> => (props: any) => {
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
