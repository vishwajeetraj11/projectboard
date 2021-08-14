import React from 'react';

interface Props {
  isMobile: boolean;
}

export const UsersColHeader: React.FC<Props> = ({ isMobile }) => {
  return (
    <div className='w-full member-grid-container mt-5 mb-3'>
      <p className='font-semibold text-sm'>Photo</p>
      {!isMobile && <p className='font-semibold text-sm'>Full Name</p>}
      <p className='font-semibold text-sm'>Username</p>
      <p className='text-center font-semibold text-sm'>Add</p>
    </div>
  );
};

