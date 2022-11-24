import axios from 'axios';
import { User, EventDTO, LogedUser, AxiosDTO } from './types';
import {
  getAllUsersFromFile,
  getAllEventsFromFile,
  addEventToFile,
  joinEventInFile,
  leaveEventInFile,
  deleteEventFile,
} from './dummyDb';

const URL: string = process.env.REACT_APP_URL + '';

export const getAuthToken = async (
  email: string,
  password: string,
): Promise<string> => {
  const apiResponse = await axios.get(URL + '/auth/login', {
    headers: {
      email,
      password,
    },
  });

  return apiResponse.data;
};

//! OLD ! OLD ! OLD ! OLD ! OLD !

export const fetchUserFromMock = async (): Promise<User> => {
  const res = await axios.get('/auth/login');
  const user: User = res.data;

  return user;
};

export const fetchAllUsers = async () => {
  return await getAllUsersFromFile();
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
