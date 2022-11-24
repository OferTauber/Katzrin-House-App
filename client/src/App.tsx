import UserIsLoged from './components/loged_user/UserIsLoged';
import Spinner from './components/util_componenets/Spinner';
import NoUserIsLoged from './components/no_loged_user/NoUserIsLoged';
import { useAppState } from './utils/state';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { RouteNames } from './utils/types';
import ProtectedRute from './components/util_componenets/ProtectedRute';
import { useEffect } from 'react';
import LoginForm from './components/no_loged_user/LoginForm';
import SignInForm from './components/no_loged_user/SignInForm';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const { isLoading, logedUser } = useAppState();

  useEffect(() => {
    console.log('State: ');
    console.log(logedUser);
  }, [logedUser]);

  if (isLoading) return <Spinner />;

  return <>{logedUser ? <UserIsLoged /> : <NoUserIsLoged />}</>;
});

export default App;
