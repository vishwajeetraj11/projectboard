// import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg';
import { ReactComponent as BacklogIcon } from 'assets/icons/circle-dot.svg';
import { ReactComponent as TodoIcon } from 'assets/icons/circle.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';
import { ReactComponent as InProgressIcon } from 'assets/icons/half-circle.svg';

import Modal from 'components/Modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Status } from 'shared/constants';
import { addStatusFilter } from 'store/actions/filterActions';

interface SearchOptionProps {
  name: string;
  onClick: () => void;
  Icon: any;
}

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
}


function SearchOption({ name, onClick, Icon }: SearchOptionProps) {
  return (
    <div onClick={onClick} className='flex items-center px-4 py-5 font-normal text-gray-700 border-l-2 border-transparent cursor-default text-14 hover:text-gray-800 hover:border-indigo-700 hover:bg-gray-100'>
      {Icon}
      <div className='text-overflow-ellipsis flex-nowrap text-14'>{name}</div>
    </div>
  );
}


export const TaskFilterModal = ({ isOpen, onDismiss }: Props) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [options,] = useState([
    {
      name: 'Filter by status: To Do',
      Icon: <TodoIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addStatusFilter(Status.TODO)); onDismiss(); }
    },
    {
      name: 'Filter by status: Backlog',
      Icon: <BacklogIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addStatusFilter(Status.BACKLOG)); onDismiss(); }
    },
    {
      name: 'Filter by status: In Progress',
      Icon: <InProgressIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addStatusFilter(Status.IN_PROGRESS)); onDismiss(); }
    },
    {
      name: 'Filter by status: Done',
      Icon: <DoneIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addStatusFilter(Status.DONE)); onDismiss(); }
    },
    {
      name: 'Filter by status: Cancelled',
      Icon: <CancelIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addStatusFilter(Status.CANCELED)); onDismiss(); }
    },
  ]);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} size='large' className='h-100' modalStyles={{ maxWidth: '700px', width: '100%' }}>
      <div className='flex flex-col w-full'>
        {/* Top search box */}
        <input type='text' value={search} onChange={onSearchChange} className='flex-grow-0 w-full p-4 text-lg border-b border-gray-200 focus:outline-none'
          placeholder='Filter Tasks...'
        />
        {/* Search option */}
        <div className='flex flex-col flex-grow w-full overflow-hidden' style={{ height: '338px', overflowY: 'scroll' }}>
          <div className='px-4 mt-1 font-normal text-gray-500'>Filter</div>
          {React.Children.toArray(options.map((option => <SearchOption onClick={option.onClick} name={option.name} Icon={option.Icon} />)))}
        </div>
      </div>
    </Modal>
  );
};
