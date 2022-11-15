import axios from 'axios';
import { User, EventDTO, LogedUser } from './types';
import {
  getAllUsersFromFile,
  loginFromFile,
  getAllEventsFromFile,
  addEventToFile,
  joinEventInFile,
  leaveEventInFile,
  deleteEventFile,
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

export const joinToEvent = async (
  eventsToJoin: EventDTO,
  logedUser: LogedUser,
) => {
  return await joinEventInFile(eventsToJoin, logedUser);
};

export const leaveEvent = async (
  eventsToLeave: EventDTO,
  logedUser: LogedUser,
) => {
  return await leaveEventInFile(eventsToLeave, logedUser);
};

export const deleteEvent = async (eventsToDelete: EventDTO) => {
  return await deleteEventFile(eventsToDelete);
};
