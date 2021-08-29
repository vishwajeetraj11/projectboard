import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Avatar } from 'components/Avatar';
import React from 'react';
import { User } from 'shared/types';

interface Props {
  user: User;
  isMobile: boolean;
  disableAddButton: boolean;
  onAddMember: (userId: string) => void;
}



export const UserRow: React.FC<Props> = ({ isMobile, user, disableAddButton, onAddMember }) => {
  return (
    <div className='w-full member-grid-container my-3'>
      <Avatar name={`${user?.firstName} ${user?.lastName}`} />
      {!isMobile && <p>{`${user.firstName} ${user.lastName}`}</p>}
      <p className=''>{user.username}</p>
      <Button onClick={() => onAddMember(user._id)} disabled={disableAddButton} className='flex items-center justify-center bg-green-400'><AddIcon className='h-5 w-5 text-white' /></Button>
    </div>
  );
};
