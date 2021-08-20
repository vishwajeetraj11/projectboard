import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { useState } from 'react';
import { TaskFilterModal } from './modals/TaskFilterModal';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { topFilterType } from 'shared/constants';
import { getStatusText } from 'shared/utils/common';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { addStatusFilter } from 'store/actions/filterActions';

interface Props {
  /* Top title */
  title: string;
  onOpenMenu?: () => void;
  type?: string;
}

export const TopFilter = ({ title, onOpenMenu, type }: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const dispatch = useDispatch();

  const tasks = useSelector((state: RootState) => state.taskList.tasks);
  const { status } = useSelector((state: RootState) => state.filters);
  const totaltasks = tasks.backlog.length + tasks.todo.length
    + tasks.done.length + tasks.in_progress.length + tasks.cancelled.length;

  const onInvitePage = type === topFilterType.INVITE;
  // const onNotificationPage = type === topFilterType.NOTIFICATIONS;
  const onTasksPage = type === topFilterType.TASKS;

  return (
    <>
      <div className='flex justify-between flex-shrink-0 pl-2 pr-6 border-b border-gray-200 h-14 lg:pl-9'>
        {/* left section */}
        <div className='flex items-center'>
          <button
            className='flex-shrink-0 h-full px-5 focus:outline-none lg:hidden'
            onClick={onOpenMenu}
          ><MenuIcon className='w-3.5 text-gray-500 hover:text-gray-800' /></button>

          <div className='p-1 font-semibold cursor-default hover:bg-gray-100'>{title}</div>
          {!onInvitePage && <span>{totaltasks}</span>}
          {onTasksPage && <>
            {status && <div className='ml-3 capitalize text-gray-700 px-2 py-1 bg-gray-100 hover:bg-gray-50 rounded-md flex items-center'>
              <p>{getStatusText(status)}</p>
              <div onClick={() => dispatch(addStatusFilter(''))}><CloseIcon className='ml-1.5 w-3 h-3 cursor-pointer' /></div>
            </div>}
          </>}
          {onTasksPage && <button
            className='px-1 py-0.5 ml-3 border border-gray-300 border-dashed rounded text-gray-500 hover:border-gray-400 focus:outline-none hover:text-gray-800'
            onClick={() => setShowFilter(!showFilter)}
          >+ Filter</button>}
        </div>


      </div>
      {onTasksPage && <>
        <TaskFilterModal isOpen={showFilter} onDismiss={() => setShowFilter(false)} /></>}
    </>
  );
};
