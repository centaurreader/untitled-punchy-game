import React from 'react';
import auth from '../services/Auth';
import authHoc from '../higherOrderComponents/auth.hoc';

const SignIn: React.FC<{
  updateAuthState: (s: boolean) => {};
}> = ({
  updateAuthState,
}) => {
  const signIn = () => {
    auth.signIn()
    .then(() => {
      updateAuthState(true);
    })
    .catch(() => {
      console.log('error logging in');
    });
  };

  return (
    <>
      <h1>UPG Sandbox</h1>
      <p>Please sign in to continue.</p>
      <button type="button" onClick={signIn}>Sign In</button>
    </>
  )
};

export default authHoc(SignIn);
