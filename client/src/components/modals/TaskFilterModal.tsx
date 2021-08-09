import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import Modal from 'components/Modal';
import React, { useState } from 'react';

interface SearchOptionProps {
  name: string;
}

interface Props {
  isOpen: boolean;
  onDismiss?: () => void;
}


function SearchOption({ name }: SearchOptionProps) {
  return (
    <div className='flex items-center px-4 py-5 font-normal text-gray-700 border-l-2 border-transparent cursor-default text-14 hover:text-gray-800 hover:border-indigo-700 hover:bg-gray-100'>
      <SearchIcon className='w-4 h-4 mr-4 ' />
      <div className='text-overflow-ellipsis flex-nowrap text-14'>{name}</div>
    </div>
  );
}


export const TaskFilterModal = ({ isOpen, onDismiss }: Props) => {
  const [search, setSearch] = useState('');

  const [options, setOptions] = useState([
    {
      name: 'Filter by content...',
    },
    {
      name: 'Filter by status...',
    },
    {
      name: 'Filter by priority...',
    },
    {
      name: 'Filter by assignee...',
    },
    {
      name: 'Filter by subscriber...',
    },
    {
      name: 'Filter by creator...',
    },
    {
      name: 'Filter by label...',
    },
    {
      name: 'Filter by due date...',
    },
    {
      name: 'Filter by start date...',
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
          placeholder='Filter Issues...'
        />
        {/* Search option */}
        <div className='flex flex-col flex-grow w-full overflow-hidden' style={{ height: '338px', overflowY: 'scroll' }}>
          <div className='px-4 mt-1 font-normal text-gray-500'>Filter</div>
          {React.Children.toArray(options.map((option => <SearchOption name={option.name} />)))}
        </div>
      </div>
    </Modal>
  );
};
