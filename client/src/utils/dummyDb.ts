import { User, EventDTO, LogedUser, exclusive } from './types';

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
    start: new Date(2022, 10, 1),
    end: new Date(2022, 10, 3),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.no,
    joining: [Shakked],
  },
  {
    title: 'מסיבה',
    allDay: true,
    start: new Date(2022, 10, 4),
    end: new Date(2022, 10, 6),
    owner: Maya,
    isExclusiveConfirmed: exclusive.no,
    joining: [Ofer, Shakked],
  },
  {
    title: 'עוד מסיבה',
    allDay: true,
    start: new Date(2022, 10, 7),
    end: new Date(2022, 10, 9),
    owner: Maya,
    isExclusiveConfirmed: exclusive.no,
    joining: [Shakked],
  },
  {
    title: 'אירוע',
    start: new Date(2022, 10, 10),
    end: new Date(2022, 10, 11),
    owner: Maya,
    isExclusiveConfirmed: exclusive.unConfirmed,
    joining: [Ofer, Shakked],
  },
  {
    title: 'אירוע פרטי 1',
    start: new Date(2022, 10, 22),
    end: new Date(2022, 10, 24),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.unConfirmed,
    joining: [],
  },
  {
    title: 'אירוע פרטי 2',
    start: new Date(2022, 10, 28),
    end: new Date(2022, 10, 30),
    owner: Ofer,
    isExclusiveConfirmed: exclusive.confirmed,
    joining: [],
  },

  {
    title: 'חגיגה',
    start: new Date(2022, 10, 15),
    end: new Date(2022, 10, 20),
    owner: Shakked,
    isExclusiveConfirmed: exclusive.confirmed,
    joining: [],
  },
];

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
