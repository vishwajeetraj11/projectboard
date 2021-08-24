import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface Props {
  isMobile: boolean;
}

export const MembersColHeader: React.FC<Props> = ({ isMobile }) => {
  const { projectData } = useSelector((state: RootState) => state.currentProject);
  return (
    <div className='w-full member-grid-container my-3'>
      <p className=' font-semibold text-sm'>Full Name</p>
      <p className=' font-semibold text-sm'>Project Access</p>
      {!isMobile && <p className=' font-semibold text-sm'>Email</p>}
      {projectData.access === 'admin' && <p className='text-center font-semibold text-sm'>Remove</p>}
    </div>
  );
};
