import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { connectMenu } from 'react-contextmenu';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { loadIssues, updateIssuePriority, updateIssueStatus } from 'store/actions/issueActions';
import { Task } from 'shared/types';
import { RootState } from '../../store/store';
import { TaskContextMenu } from '../menus/TaskContextMenu';
import { TaskRow } from './TaskRow';

export const TaskList = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const allTasks = useSelector((state: RootState) => state.taskList.tasks);
  const { loading, error } = useSelector((state: RootState) => state.taskList);
  const { status, priority, label } = useSelector((state: RootState) => state.filters);

  let tasks = [...allTasks.backlog, ...allTasks.todo, ...allTasks.in_progress, ...allTasks.done, ...allTasks.cancelled];

  if (status) {
    tasks = tasks.filter((task: Task) => task.status === status);
  }

  if (priority || location?.state?.priority) {
    tasks = tasks.filter((task: Task) => task.priority === priority);
  }

  if (label || location?.state?.label) {
    tasks = tasks.filter((task: Task) => task.label === label);
  }

  // tasks = tasks.filter((task:Task) => task.status !== filters)
  // sort tasks by order
  // tasks = tasks.sort((a, b) => {
  //     let aId = parseInt(a.id.split('-')[1]);
  //     let bId = parseInt(b.id.split('-')[1]);
  //     return aId - bId;
  // });

  const taskRows = tasks.map((task, idx) => {
    const ConnectedMenu = connectMenu(task._id)(TaskContextMenu);
    return (
      <>
        <TaskRow
          task={task}
        />
        <ConnectedMenu />
      </>
    );
  });
  return (
    <div className={`flex flex-col overflow-auto ${!taskRows.length ? 'flex-1' : ''}`}>
      {
        loading
          ? <div className='flex items-center justify-center flex-1' style={{ minHeight: '50vh' }}><CircularProgress color="primary" /></div>
          : error ? <div className='flex items-center justify-center flex-1' style={{ minHeight: '50vh' }}>{error}</div>
            : taskRows.length === 0
              ? <div className='flex-1 flex items-center justify-center'>No Tasks Yet</div>
              : React.Children.toArray(taskRows)
      }
    </div>
  );
};

