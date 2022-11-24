import { useAppState } from '../../utils/state';
import { observer } from 'mobx-react-lite';

const LoginForm = observer(
  ({ switchToSignin }: { switchToSignin: () => void }) => {
    const validData = { email: 'ofertauber@gmail.com', password: '123' };
    const invalidData = { email: 'ofertauber@gmail.com', password: '124' };

    const state = useAppState();

    const login = (data: typeof validData) => {
      state.login(data.email, data.password);
    };

    return (
      <>
        <button
          onClick={() => {
            login(validData);
          }}
        >
          תקין
        </button>
        <br />
        <button
          onClick={() => {
            login(invalidData);
          }}
        >
          לא תקין
        </button>
        <br />
        <button onClick={switchToSignin}>הרשמה</button>
      </>
    );
  },
);

export default LoginForm;
