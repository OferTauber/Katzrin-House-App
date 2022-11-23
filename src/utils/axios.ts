// import { User, UserToExport } from 'src/consts/classes_and_DTOs';
import { getUserByIdFromFile, getUserByEmailFromFile } from 'src/dummyDb/users';

export const getUserByEmailFile = async (email: string) => {
  return await getUserByEmailFromFile(email);
};
