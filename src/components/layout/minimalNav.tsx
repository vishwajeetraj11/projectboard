import { LogoutButton } from 'components/auth/Logout';
import React from 'react';

interface Props {

}

export const MinimalNav: React.FC<Props> = () => {
  return (
    <div className='p-y lg:py-10 sm:px-4 lg:px-0 flex items-center justify-between'>
      <h2>Product Board</h2>
      <LogoutButton />
    </div>
  );
};
