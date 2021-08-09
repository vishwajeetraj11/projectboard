import React, { useEffect } from 'react';
import { connectMenu } from 'react-contextmenu';
import { useSelector } from 'react-redux';
// import { loadIssues, updateIssuePriority, updateIssueStatus } from 'store/actions/issueActions';
import { Task } from 'shared/types';
import { RootState } from '../../store/store';
import IssueContextMenu from '../menus/TaskContextMenu';
import { TaskRow } from './TaskRow';

const ConnectedMenu = connectMenu('ISSUE_CONTEXT_MENU')(IssueContextMenu);
export const TaskList = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector((state: RootState) => state.taskList.tasks);

  let tasks = [...allTasks.backlog, ...allTasks.todo, ...allTasks.in_progress, ...allTasks.done, ...allTasks.cancelled];
  // sort issues by id
  // issues = issues.sort((a, b) => {
  //     let aId = parseInt(a.id.split('-')[1]);
  //     let bId = parseInt(b.id.split('-')[1]);
  //     return aId - bId;
  // });

  const handleIssueStatusChange = (task: Task, status: string) => {

    // dispatch(updateIssueStatus(issue, status));
  };

  const handleIssuePriorityChange = (task: Task, priority: string) => {
    // dispatch(updateIssuePriority(issue, priority));
  };

  useEffect(() => {
    // dispatch(loadIssues());
  }, []);

  const taskRows = tasks.map((task, idx) => (
    <TaskRow
      task={task}
      onChangePriority={handleIssuePriorityChange}
      onChangeStatus={handleIssueStatusChange}
    />
  ));
  return (
    <div className='flex flex-col overflow-auto'>
      {React.Children.toArray(taskRows)}
      <ConnectedMenu />
    </div>
  );
};

