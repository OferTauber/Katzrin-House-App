import { User } from 'src/consts/classes_and_DTOs';

export const getUserByEmailFromFile = (email: string, optionsFile?: number) => {
  if (optionsFile === 1) return undefined;
  if (optionsFile === 2) throw new Error('db in not avilable');

  return users.find((listedUser) => listedUser.email === email);
};

export const getUserByIdFromFile = (id: string, optionsFile?: number) => {
  if (optionsFile === 1) return undefined;
  if (optionsFile === 2) throw new Error('db in not avilable');

  return users.find((listedUser) => listedUser.id === id);
};

export const getAllUsersFromFile = (optionsFile?: number) => {
  if (optionsFile === 1) return undefined;
  if (optionsFile === 2) throw new Error('db in not avilable');

  return users;
};

const users: User[] = [
  {
    name: 'עופר',
    id: '1',
    isAdmin: true,
    email: 'ofertauber@gmail.com',
    password: '123',
  },
  {
    name: 'מאיה',
    id: '2',
    isAdmin: false,
    email: 'maya.yoshke@gmail.com',
    password: '123',
  },
  {
    name: 'שקד',
    id: '3',
    isAdmin: false,
    email: 'shakked@gmail.com',
    password: '123',
  },
];
