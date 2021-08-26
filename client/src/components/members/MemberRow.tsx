import { Button } from '@material-ui/core';
import React from 'react';
import { Member } from 'shared/types';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface Props {
  member: Member,
  isMobile: boolean;
  disableDeleteButton: boolean;
  onDeleteMember: (memberId: string) => void;
}

export const MemberRow: React.FC<Props> = ({ member, isMobile, disableDeleteButton, onDeleteMember }) => {
  const { projectData } = useSelector((state: RootState) => state.currentProject);
  const onDelete = () => {
    onDeleteMember(member._id);
  };
  return (
    <div className='w-full member-grid-container'>
      <p>{member.user.firstName} {member.user.lastName}</p>
      <p>{member.access}</p>
      {!isMobile && <p>{member.user.email}</p>}
      {(projectData.access === 'admin' && !(member.access === 'admin')) && <Button onClick={onDelete} disabled={disableDeleteButton} className='flex items-center justify-center'><HighlightOffOutlinedIcon className='h-5 w-5 text-red-500' /></Button>}
    </div>
  );
};
