import UserIsLoged from './components/loged_user/UserIsLoged';
import { useQuery } from '@tanstack/react-query';
import { LogedUser } from './utils/types';
import Spinner from './components/util_componenets/Spinner';
import NoUserIsLoged from './components/no_loged_user/NoUserIsLoged';
import Error from './components/util_componenets/Error';

function sleep() {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

function App() {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery(['user'], async () => {
    const logedUser: LogedUser = {
      name: 'Ofer',
      id: 'ofertauber@gmail.com',
      isAdmin: true,
    };
    await sleep();
    return logedUser;
  });

  if (isLoading) return <Spinner />;

  if (isError) return <Error />;

  return <>{user ? <UserIsLoged /> : <NoUserIsLoged />}</>;
}

export default App;
