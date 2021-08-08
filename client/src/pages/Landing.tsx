import { LoginButton } from 'components/auth/LoginButton';
import React from 'react';

interface Props {

}

export const Landing: React.FC<Props> = () => {
  return (
    <>
      <LoginButton />
      <div>
        Landing
      </div>
    </>
  )
    ;
};
