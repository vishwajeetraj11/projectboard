import React from 'react';

interface Props {
  isMobile: boolean;
}

export const MembersColHeader: React.FC<Props> = ({ isMobile }) => {
  return (
    <div className='w-full member-grid-container my-3'>
      <p className=' font-semibold text-sm'>Full Name</p>
      <p className=' font-semibold text-sm'>Project Access</p>
      {!isMobile && <p className=' font-semibold text-sm'>Email</p>}
      <p className='text-center font-semibold text-sm'>Remove</p>
    </div>
  );
};
