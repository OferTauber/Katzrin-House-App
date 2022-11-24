import { Navigate } from 'react-router-dom';
import { useAppState } from '../../utils/state';
import { RouteNames } from '../../utils/types';
import { observer } from 'mobx-react-lite';

const ProtectedRute = observer(({ children }: { children: any }) => {
  const { logedUser } = useAppState();

  if (!logedUser) return <Navigate to={RouteNames.login} />;

  return <>{children}</>;
});

export default ProtectedRute;
