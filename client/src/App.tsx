import UserIsLoged from './components/loged_user/UserIsLoged';
import Spinner from './components/util_componenets/Spinner';
import NoUserIsLoged from './components/no_loged_user/NoUserIsLoged';
import { useAppState } from './utils/state';

function App() {
  const { logedUser, isLoading } = useAppState();

  if (isLoading) return <Spinner />;

  return <>{logedUser ? <UserIsLoged /> : <NoUserIsLoged />}</>;
}

export default App;
