import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '../../utils/types';
import { login } from '../../utils/axios';

const NoUserIsLoged = () => {
  const validData = { email: 'ofertauber@gmailk.com', password: '123' };
  const invalidData = { email: 'ofertauber@gmailk.com', password: '124' };

  // const login = (data: { email: string; password: string }) => {
  //   useQuery([QueryKeys.user], login(data));
  // };

  return <div>NoUserIsLoged</div>;
};

export default NoUserIsLoged;
