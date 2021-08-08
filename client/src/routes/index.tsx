import React from 'react';
import { AuthenticatedRoutes } from 'routes/AuthenticatedRoutes';
import { UnauthenticatedRoutes } from 'routes/Unauthenticated';

interface Props {

}

export const Routes: React.FC<Props> = () => {
  const user = false;
  return (
    <>
      {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </>
  );
};
