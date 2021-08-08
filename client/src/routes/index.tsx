import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { AuthenticatedRoutes } from 'routes/AuthenticatedRoutes';
import { UnauthenticatedRoutes } from 'routes/Unauthenticated';

interface Props {

}

export const Routes: React.FC<Props> = () => {
  const { user } = useAuth0();
  return (
    <>
      {user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />}
    </>
  );
};
