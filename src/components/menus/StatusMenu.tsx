import CancelIcon from 'assets/icons/cancel.svg';
import BacklogIcon from 'assets/icons/circle-dot.svg';
import TodoIcon from 'assets/icons/circle.svg';
import DoneIcon from 'assets/icons/done.svg';
import InProgressIcon from 'assets/icons/half-circle.svg';
import { Portal } from 'components/Portal';
import React, { ReactNode, useState } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Status } from '../../shared/constants';
import { Menu } from './Menu';


interface Props {
  id: string;
  button: ReactNode;
  className?: string;
  onSelect?: (item: any) => void;
  disabled?: boolean;
}
export const StatusMenu = ({ id, button, className, onSelect, disabled }: Props) => {
  const [keyword, setKeyword] = useState('');
  const handleSelect = (status: string) => {
    if (onSelect) onSelect(status);
  };

  let statuses = [
    [BacklogIcon, Status.BACKLOG, 'Backlog'],
    [TodoIcon, Status.TODO, 'Todo'],
    [InProgressIcon, Status.IN_PROGRESS, 'In Progress'],
    [DoneIcon, Status.DONE, 'Done'],
    [CancelIcon, Status.CANCELED, 'Cancelled']
  ];
  if (keyword !== '') {
    let normalizedKeyword = keyword.toLowerCase().trim();
    statuses = statuses.filter(([icon, id, l]) => l.toLowerCase().indexOf(normalizedKeyword) !== -1);
  }

  let options = statuses.map(([icon, id, label]) => {
    return (
      <Menu.Item
        onClick={() => handleSelect(id)}
      >
        <img src={icon} className='w-3.5 h-3.5 mr-3' alt={'Status Icon'} />
        <div className='flex-1 overflow-hidden'>{label}</div>
      </Menu.Item>
    );
  });

  return (
    <>
      <ContextMenuTrigger disable={disabled} id={id} holdToDisplay={1}>
        {button}
      </ContextMenuTrigger>

      <Portal>
        <Menu
          id={id}
          size='normal'
          filterKeyword={true}
          className={className}
          searchPlaceholder='Set status...'
          onKeywordChange={(kw) => setKeyword(kw)}
        >
          {React.Children.toArray(options)}
        </Menu>
      </Portal>
    </>
  );
};
