import { User, EventDTO } from './types';

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
