// import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg';
import { ReactComponent as BacklogIcon } from 'assets/icons/circle-dot.svg';
import { ReactComponent as TodoIcon } from 'assets/icons/circle.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';
import { ReactComponent as InProgressIcon } from 'assets/icons/half-circle.svg';
import { ReactComponent as NoPriorityIcon } from 'assets/icons/dots.svg';
import { ReactComponent as UrgentPriorityIcon } from 'assets/icons/rounded-claim.svg';
import { ReactComponent as MediumPriorityIcon } from 'assets/icons/signal-medium.svg';
import { ReactComponent as HighPriorityIcon } from 'assets/icons/signal-strong.svg';
import { ReactComponent as LowPriorityIcon } from 'assets/icons/signal-weak.svg';
import Modal from 'components/modals/Modal';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Status } from 'shared/constants';
import { Priority } from 'shared/constants';
import { Labels } from 'shared/constants';
import { addStatusFilter } from 'store/actions/filterActions';
import { addPriorityFilter } from 'store/actions/filterActions';
import { addLabelFilter } from 'store/actions/filterActions';

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
};


export const TaskFilterModal = ({ isOpen, onDismiss }: Props) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const options = [
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
    {
      name: 'Filter by priority: No Priority',
      Icon: <NoPriorityIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addPriorityFilter(Priority.NO_PRIORITY)); onDismiss(); }
    },
    {
      name: 'Filter by priority: Urgent',
      Icon: <UrgentPriorityIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addPriorityFilter(Priority.URGENT)); onDismiss(); }
    },
    {
      name: 'Filter by priority: High',
      Icon: <HighPriorityIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addPriorityFilter(Priority.HIGH)); onDismiss(); }
    },
    {
      name: 'Filter by priority: Medium',
      Icon: <MediumPriorityIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addPriorityFilter(Priority.MEDIUM)); onDismiss(); }
    },
    {
      name: 'Filter by priority: Low',
      Icon: <LowPriorityIcon className='w-4 h-4 mr-4 ' />,
      onClick: () => { dispatch(addPriorityFilter(Priority.LOW)); onDismiss(); }
    },
    {
      name: 'Filter by labels: Bug',
      Icon: <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ background: '#eb5757' }}></div>,
      onClick: () => { dispatch(addLabelFilter(Labels.BUG)); onDismiss(); }
    },
    {
      name: 'Filter by labels: Feature',
      Icon: <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ background: '#bb87fc' }}></div>,
      onClick: () => { dispatch(addLabelFilter(Labels.FEATURE)); onDismiss(); }
    },
    {
      name: 'Filter by labels: Improvement',
      Icon: <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ background: '#4ea7fc' }}></div>,
      onClick: () => { dispatch(addLabelFilter(Labels.IMPROVEMENT)); onDismiss(); }
    },
    {
      name: 'Filter by labels: No Label',
      Icon: <div className="w-2.5 h-2.5 rounded-full mr-3" style={{ background: '#999999' }}></div>,
      onClick: () => { dispatch(addLabelFilter(Labels.NO_LABEL)); onDismiss(); }
    },
  ];

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} size='large' className='h-100' modalStyles={{ maxWidth: '700px', width: '100%' }}>
      <div className='flex flex-col w-full'>
        {/* Top search box */}
        <input disabled type='text' value={search} onChange={onSearchChange} className='select-none flex-grow-0 w-full p-4 text-lg border-b border-gray-200 focus:outline-none'
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


