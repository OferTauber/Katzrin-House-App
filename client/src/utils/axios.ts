import axios from 'axios';
import { User, EventDTO } from './types';
import {
  getAllUsersFromFile,
  loginFromFile,
  getAllEventsFromFile,
  addEventToFile,
} from './dummyDb';

const URL = 'https://637111510399d1995d8a71a9.mockapi.io';

export const fetchUserFromMock = async (): Promise<User> => {
  const res = await axios.get(URL + '/users/1');
  const user: User = res.data;

  return user;
};

export const fetchAllUsers = async () => {
  return await getAllUsersFromFile();
};

export const login = async () => {
  return await loginFromFile();
};

export const fetchCalendsrEvents = async () => {
  return await getAllEventsFromFile();
};

export const bookNewEvent = async (event: EventDTO) => {
  return await addEventToFile(event);
};
