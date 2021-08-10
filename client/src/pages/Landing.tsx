import { LoginButton } from 'components/auth/LoginButton';
import { LogoutButton } from 'components/auth/Logout';
import React from 'react';

interface Props {

}

export const Landing: React.FC<Props> = () => {
  return (
    <>
      <LoginButton />
      <LogoutButton />
      <div>
        Landing
      </div>
    </>
  )
    ;
};
