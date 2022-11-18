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
import { AxiosDTO } from './types';

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
  // todo : Promise<AxiosDTO>
  return await addEventToFile(event);
};

export const joinToEvent = async (
  eventsToJoin: EventDTO,
  logedUser: LogedUser,
) => {
  const toReturn = new AxiosDTO();
  try {
    toReturn.data = await joinEventInFile(eventsToJoin, logedUser);
  } catch (e) {
    toReturn.error = e;
  }
  return toReturn;
};

export const leaveEvent = async (
  eventsToLeave: EventDTO,
  logedUser: LogedUser,
): Promise<AxiosDTO> => {
  const toRetun = new AxiosDTO();
  try {
    toRetun.data = await leaveEventInFile(eventsToLeave, logedUser);
  } catch (e) {
    toRetun.error = e;
  }
  return toRetun;
};

export const deleteEvent = async (
  eventsToDelete: EventDTO,
): Promise<AxiosDTO> => {
  const toRetun = new AxiosDTO();
  try {
    toRetun.data = await deleteEventFile(eventsToDelete);
  } catch (e) {
    toRetun.error = e;
  }
  return toRetun;
};
