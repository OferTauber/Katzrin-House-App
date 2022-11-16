import { User, EventDTO, exclusive } from './types';
import { format, isAfter, isBefore, isPast } from 'date-fns';

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
export enum datesValidationStatus {
  valid = 'ניתן להזמין',
  expired = 'לא ניתן להזמין תאריכים שכבר עברו',
  blockedByOpen = 'כבר קיימת הזמנה בטווח התאריכים',
  blockedByClose = 'כבר קיימת הזמנה סגורה בטווח התאריכים',
  crossDates = 'מועד היציאה לא יכול להיות קודם למועד הכניסה',
}

export const validateDatesForReservation = (
  dateStart: string,
  dateEnd: string,
  isClose: boolean,
  events: EventDTO[],
): datesValidationStatus => {
  if (isPast(new Date(dateStart)) || isPast(new Date(dateEnd)))
    return datesValidationStatus.expired;

  if (isBefore(new Date(dateEnd), new Date(dateStart)))
    return datesValidationStatus.crossDates;

  const filreedEvents = isClose
    ? [...events]
    : filterExclusiveEventsOnly(events);

  const startOfNewEvent = new Date(dateStart);
  const endOfNewEvent = new Date(dateEnd);

  const blockingEvents = filreedEvents.find((bookedEvent: EventDTO) => {
    const startOfBookedevent = new Date(bookedEvent.start);
    const endOfBookedEvent = new Date(bookedEvent.end);

    if (isAfter(startOfBookedevent, endOfNewEvent)) return false;
    if (isBefore(endOfBookedEvent, startOfNewEvent)) return false;
    return true;
  });

  if (!blockingEvents) return datesValidationStatus.valid;

  return isClose
    ? datesValidationStatus.blockedByOpen
    : datesValidationStatus.blockedByClose;
};

function filterExclusiveEventsOnly(events: EventDTO[]) {
  return events.filter(
    (event: EventDTO) => event.isExclusiveConfirmed !== exclusive.no,
  );
}

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};
