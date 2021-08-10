import { PriorityMenu } from 'components/menus/PriorityMenu';
import { StatusMenu } from 'components/menus/StatusMenu';
import { PriorityIcon } from 'components/PriorityIcon';
import { StatusIcon } from 'components/StatusIcon';
import { ContextMenuTrigger } from 'react-contextmenu';
import { DEFAULT_LABLES, Labels } from 'shared/constants';
import { Task } from 'shared/types';
import { formatDate } from 'shared/utils/formatDate';

interface Props {
  task: Task;
  onChangePriority?: (issue: Task, priority: string) => void;
  onChangeStatus?: (issue: Task, priority: string) => void;
}


export const TaskRow = ({ task, onChangePriority, onChangeStatus }: Props) => {
  let priorityIcon = (
    <PriorityIcon
      priority={task.priority} />
  );
  const statusIcon = (
    <StatusIcon status={task.status} />
  );

  const getLabelObj = (label: string) => {
    switch (label) {
      case Labels.NO_LABEL:
        return DEFAULT_LABLES[3];
      case Labels.IMPROVEMENT:
        return DEFAULT_LABLES[2];
      case Labels.FEATURE:
        return DEFAULT_LABLES[1];
      case Labels.BUG:
        return DEFAULT_LABLES[0];
    }
  };

  const labelObj = getLabelObj(task.label);

  // let avatar = task.author && task.author.avatar
  //   ? <img src={task.author.avatar} className='w-4.5 h-4.5 rounded-full overflow-hidden' alt={`User - ${task.author.email}`} />
  //   : <img src={DefaultAvatarIcon} className='w-4.5 h-4.5 rounded-full overflow-hidden' alt={`User - ${task.author.email}`} />;

  const handleChangePriority = (p: string) => {
    if (onChangePriority) onChangePriority(task, p);
  };

  const handleChangeStatus = (status: string) => {
    if (onChangeStatus) onChangeStatus(task, status);
  };
  return (
    <ContextMenuTrigger
      id="ISSUE_CONTEXT_MENU"
    >
      <div key={task._id} className='inline-flex items-center flex-grow flex-shrink w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-gray-100 h-11' id={task._id}>
        {/* <div className='flex-shrink-0 hidden ml-2 sm:block'>
          <input type='checkbox' className='rounded-sm appearance-none form-checkbox focus:ring-transparent focus:outline-none form-stick checked:bg-indigo-600 checked:border-transparent border border-gray-300 md:border-transparent hover:border-gray-600 w-3.5 h-3.5' />
        </div> */}
        <div className='flex-shrink-0 ml-2'>
          <PriorityMenu
            // id={'r-priority-' + task._id}
            button={(
              <div className='flex-shrink-0 ml-2'>
                <PriorityIcon
                  priority={task.priority} />
              </div>
            )}
            onSelect={handleChangePriority}
          />
        </div>
        <div className='flex-shrink-0 ml-2'>
          <StatusMenu
            id={'r-status-' + task._id}
            button={statusIcon}
            onSelect={handleChangeStatus}
          />
        </div>
        <div className='flex-wrap flex-shrink ml-2 overflow-hidden font-medium line-clamp-1 overflow-ellipsis'>{task.title.substr(0, 100) || ''}</div>
        <div className='flex flex-grow ml-2'></div>
        {labelObj?.name !== 'No Label' && <div className='select-none flex items-center px-3 py-0.5 text-gray-500 focus:outline-none hover:text-gray-800 hover:bg-gray-100 cursor-pointer border-solid border-gray-100 border-2 rounded-xl mr-3'>
          <div className='w-2 h-2 rounded-full mr-2' style={{ background: labelObj?.color }}>&nbsp;</div>
          <div className='text-xs'>{labelObj?.name}</div>
        </div>}
        <div className='flex-shrink-0 hidden w-max ml-2 mr-3 font-normal sm:block'>{formatDate(task.startDate)}</div>
        {/* <div className='flex-shrink-0 ml-auto'>{avatar}</div> */}
      </div>
    </ContextMenuTrigger>
  );
};
