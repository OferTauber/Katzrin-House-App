import { User, EventDTO } from './types';
import { format } from 'date-fns';

export const exctracDataToString = (date: Date): string => {
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export const extreacJoinungList = (
  event: EventDTO,
  logedUser?: User,
): string => {
  if (!event.joining) return '';

  const joining = event.joining.map((user: User) => {
    if (!logedUser) return user.name;

    return user.id === logedUser.id ? 'אני' : user.name;
  });

  return joining.join(', ');
};

export const userIsJoining = (event: EventDTO, logedUser: User): boolean => {
  return !!event.joining.find((user: User) => user.id === logedUser?.id);
};

const validateDatesForOpenReservation = (
  dateStart: string,
  dateEnd: string,
  events: EventDTO[],
): boolean => {
  console.log(events[0]);
  return true;
};
const validateDatesForCloseReservation = (
  dateStart: string,
  dateEnd: string,
  events: EventDTO[],
): boolean => {
  console.log(events[0]);
  return true;
};

export const validateDatesForReservation = (
  dateStart: string,
  dateEnd: string,
  isClose: boolean,
  events: EventDTO[],
): boolean => {
  return isClose
    ? validateDatesForCloseReservation(dateStart, dateEnd, events)
    : validateDatesForOpenReservation(dateStart, dateEnd, events);
};

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
