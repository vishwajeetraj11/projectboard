import React, { useEffect } from 'react';
import { connectMenu } from 'react-contextmenu';
import { useSelector } from 'react-redux';
// import { loadIssues, updateIssuePriority, updateIssueStatus } from 'store/actions/issueActions';
import { Task } from 'shared/types';
import { RootState } from '../../store/store';
import { TaskContextMenu } from '../menus/TaskContextMenu';
import { TaskRow } from './TaskRow';

export const TaskList = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector((state: RootState) => state.taskList.tasks);
  const { status,priority,label } = useSelector((state: RootState) => state.filters);

  let tasks = [...allTasks.backlog, ...allTasks.todo, ...allTasks.in_progress, ...allTasks.done, ...allTasks.cancelled];

  if (status) {
    tasks = tasks.filter((task: Task) => task.status === status);
  }

  if (priority) {
    tasks = tasks.filter((task: Task) => task.priority === priority);
  }

  if (label) {
    tasks = tasks.filter((task: Task) => task.label === label);
  }

  // tasks = tasks.filter((task:Task) => task.status !== filters)
  // sort tasks by order
  // tasks = tasks.sort((a, b) => {
  //     let aId = parseInt(a.id.split('-')[1]);
  //     let bId = parseInt(b.id.split('-')[1]);
  //     return aId - bId;
  // });

  const handleTaskStatusChange = (task: Task, status: string) => {

    // dispatch(updateTaskStatus(task, status));
  };

  const handleTaskPriorityChange = (task: Task, priority: string) => {
    // dispatch(updateTaskPriority(task, priority));
  };

  useEffect(() => {
    // dispatch(loadTasks());
  }, []);

  const taskRows = tasks.map((task, idx) => {
    const ConnectedMenu = connectMenu(task._id)(TaskContextMenu);
    return (
      <>
        <TaskRow
          task={task}
          onChangePriority={handleTaskPriorityChange}
          onChangeStatus={handleTaskStatusChange}
        />
        <ConnectedMenu />
      </>
    );
  });
  return (
    <div className={`flex flex-col overflow-auto ${!taskRows.length ? 'flex-1' : ''}`}>
      {taskRows.length === 0 ? <div className='flex-1 flex items-center justify-center'>No Tasks Yet</div> : React.Children.toArray(taskRows)}
    </div>
  );
};

