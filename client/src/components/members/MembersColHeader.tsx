import React from 'react';

interface Props {
  isMobile: boolean;
}

export const MembersColHeader: React.FC<Props> = ({ isMobile }) => {
  return (
    <div className='w-full member-grid-container my-3'>
      <p className=''>Full Name</p>
      <p className=''>Project Access</p>
      {!isMobile && <p className=''>Email</p>}
      <p className='text-center'>Remove</p>
    </div>
  );
};
