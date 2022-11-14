import axios from 'axios';
import { User } from './types';

const URL = 'https://637111510399d1995d8a71a9.mockapi.io';

export const fetchUserFromMock = async (): Promise<User> => {
  const res = await axios.get(URL + '/users/1');
  const user: User = res.data;

  return user;
};

export const a = 1;
