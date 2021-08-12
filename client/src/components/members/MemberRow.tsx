import { Button } from '@material-ui/core';
import React from 'react';
import { Member } from 'shared/types';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

interface Props {
  member: Member,
  isMobile: boolean;
}

export const MemberRow: React.FC<Props> = ({ member, isMobile }) => {
  return (
    <div className='w-full member-grid-container'>
      <p>{member.user.firstName} {member.user.lastName}</p>
      <p>{member.access}</p>
      {!isMobile && <p>{member.user.email}</p>}
      <Button className='flex items-center justify-center'><HighlightOffOutlinedIcon className='h-5 w-5 text-red-500' /></Button>
    </div>
  );
};
