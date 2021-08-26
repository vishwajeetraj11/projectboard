import classNames from 'classnames';
import { Avatar } from 'components/Avatar';
import { PriorityMenu } from 'components/menus/PriorityMenu';
import { PriorityIcon } from 'components/PriorityIcon';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
// import { useDispatch } from 'react-redux';
import { Task } from 'shared/types';
// import { updateIssuePriority } from 'store/actions/issueActions';
// import { AppDispatch } from '../../store/store';

interface Props {
  task: Task;
  index: number;
}

export const BoardItem = ({ task, index }: Props) => {
  let priorityIcon = (
    <span
      className='inline-block m-0.5 rounded-sm border border-gray-100 hover:border-gray-200 p-0.5'
    >
      <PriorityIcon priority={task.priority} />
    </span>
  );

  // const dispatch = useDispatch<AppDispatch>();
  const updatePriority = (priority: string) => {
    // dispatch(updatePriority(task, priority));
  };

  return (
    <Draggable draggableId={task._id || 'id'} index={index} key={task._id}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        let isDragging = snapshot.isDragging && !snapshot.isDropAnimating;
        return (
          <div
            ref={provided.innerRef}
            className={classNames(
              'cursor-default flex flex-col w-full px-4 py-3 mb-2 bg-white rounded focus:outline-none',
              {
                'shadow-modal': isDragging,
              }
            )}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='flex justify-between w-full cursor-default'>
              <div className='flex flex-col'>
                <span className='text-xs font-normal text-gray-500 uppercase'>{task._id}</span>
                <span className='mt-1 text-sm font-medium text-gray-700 line-clamp-2 overflow-ellipsis'>{task.title}</span>
              </div>
              <div className='flex-shrink-0'>
                {task.assignee ?
                  <Avatar name={`${task?.assignee?.user?.firstName} ${task?.assignee?.user?.lastName}`} /> :
                  <Avatar />}
              </div>
            </div>
            <div className='mt-2.5 flex items-center'>
              <PriorityMenu
                button={priorityIcon}
                disabled
                // id={`r-priority-${task._id}`}
                filterKeyword={true}
                onSelect={(p: any) => updatePriority(p)}
              />
            </div>
          </div>
        );
      }}

    </Draggable >

  );
};
