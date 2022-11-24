import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppState } from '../../utils/state';
import UserIsLoged from '../loged_user/UserIsLoged';
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';

const NoUserIsLoged = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignin = () => {
    setIsLogin(false);
  };
  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <>
      {isLogin ? (
        <LoginForm switchToSignin={switchToSignin} />
      ) : (
        <SignInForm switchToLogin={switchToLogin} />
      )}{' '}
    </>
  );
};

export default NoUserIsLoged;
