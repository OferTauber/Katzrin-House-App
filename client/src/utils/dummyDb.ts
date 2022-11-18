import { User, EventDTO, LogedUser, exclusive } from './types';
import { formatDate } from '../utils/utilFunctions';

export const getAllEventsFromFile = () => {
  return events;
};

export const loginFromFile = () => {
  return Ofer;
};

export const getAllUsersFromFile = () => {
  return allUsers;
};

export const addEventToFile = (newEvent: EventDTO) => {
  events.push(newEvent);
  return;
};

const findEventIndex = (eventToFind: EventDTO): number => {
  const index = events.findIndex(
    (listedEvent) => listedEvent.id === eventToFind.id,
  );
  if (-1 === index) throw new Error('Event not found!');

  return index;
};

export const deleteEventFile = (event: EventDTO) => {
  const index = findEventIndex(event);
  events.splice(index, 1);
};

export const joinEventInFile = (
  eventToJoin: EventDTO,
  logedUser: LogedUser,
) => {
  const rand = Math.random() * 2 > 1;

  const index = findEventIndex(eventToJoin);

  if (rand) {
    const user: User = logedUser;
    events[index].joining.push(user);
    return 'succsess';
  } else {
    events.splice(index, 1);
    throw new Error('event has been canceld');
  }
};

export const leaveEventInFile = (
  eventToLeave: EventDTO,
  logedUser: LogedUser,
) => {
  const eventsIndex = events.findIndex(
    (listedEvent) => listedEvent.id === eventToLeave.id,
  );
  if (-1 === eventsIndex) throw new Error('Event not found!');

  const userIndex = eventToLeave.joining.findIndex(
    (user) => user.id === logedUser.id,
  );
  if (-1 === userIndex) throw new Error('User not found withins the event!');

  events[eventsIndex].joining.splice(userIndex, 1);
};

const Ofer: LogedUser = {
  name: 'עופר',
  id: 'ofertauber@gmail.com',
  isAdmin: true,
};

const Maya: User = { name: 'מאיה', id: 'maya.yoshke@gmail.com' };
const Shakked: User = { name: 'שקד', id: 'shakked@gmail.com' };
const allUsers = [
  Maya,
  Shakked,
  { name: 'עופר', email: 'ofertauber@gmail.com' },
];

const events: Array<EventDTO> = [
  {
    title: 'הזמנה',
    allDay: true,
    start: formatDate(new Date(2022, 10, 1)),
    end: formatDate(new Date(2022, 10, 3)),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.no,
    joining: [Shakked],
    id: '1',
  },
  {
    title: 'מסיבה',
    allDay: true,
    start: formatDate(new Date(2022, 10, 4)),
    end: formatDate(new Date(2022, 10, 6)),
    owner: Maya,
    isExclusiveConfirmed: exclusive.no,
    joining: [Ofer, Shakked],
    id: '2',
  },
  {
    title: 'עוד מסיבה',
    allDay: true,
    start: formatDate(new Date(2022, 10, 7)),
    end: formatDate(new Date(2022, 10, 9)),
    owner: Maya,
    isExclusiveConfirmed: exclusive.no,
    joining: [Shakked],
    id: '3',
  },
  {
    title: 'אירוע',
    start: formatDate(new Date(2022, 10, 10)),
    end: formatDate(new Date(2022, 10, 11)),
    owner: Maya,
    isExclusiveConfirmed: exclusive.unConfirmed,
    joining: [Ofer, Shakked],
    id: '4',
  },
  {
    title: 'אירוע פרטי 1',
    start: formatDate(new Date(2022, 10, 22)),
    end: formatDate(new Date(2022, 10, 24)),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.unConfirmed,
    joining: [],
    id: '5',
  },
  {
    title: 'אירוע פרטי 2',
    start: formatDate(new Date(2022, 10, 28)),
    end: formatDate(new Date(2022, 10, 30)),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.no,
    joining: [],
    id: '6',
  },

  {
    title: 'חגיגה',
    start: formatDate(new Date(2022, 10, 15)),
    end: formatDate(new Date(2022, 10, 16)),
    owner: Shakked,
    isExclusiveConfirmed: exclusive.confirmed,
    joining: [],
    id: '7',
  },
];
