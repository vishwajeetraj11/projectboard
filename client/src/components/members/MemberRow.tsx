import { Button } from '@material-ui/core';
import React from 'react';
import { Member } from 'shared/types';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

interface Props {
  member: Member,
  isMobile: boolean;
  disableDeleteButton: boolean;
  onDeleteMember: (memberId: string) => void;
  setMembers: React.Dispatch<React.SetStateAction<never[]>>;
}

export const MemberRow: React.FC<Props> = ({ member, isMobile, disableDeleteButton, onDeleteMember, setMembers }) => {
  const onDelete = () => {
    onDeleteMember(member._id);
    setMembers(mems => mems.filter((mem: Member) => mem._id !== member._id));
  };
  return (
    <div className='w-full member-grid-container'>
      <p>{member.user.firstName} {member.user.lastName}</p>
      <p>{member.access}</p>
      {!isMobile && <p>{member.user.email}</p>}
      {!(member.access === 'admin') && <Button onClick={onDelete} disabled={disableDeleteButton} className='flex items-center justify-center'><HighlightOffOutlinedIcon className='h-5 w-5 text-red-500' /></Button>}
    </div>
  );
};
