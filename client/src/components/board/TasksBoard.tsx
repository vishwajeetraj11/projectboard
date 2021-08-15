import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Status } from 'shared/constants';
import { changeStatusOfTask } from 'store/actions/taskActions';
import { AppDispatch, RootState } from '../../store/store';
import { IssueCol } from './BoardColumn';
interface MatchParams {
  id: string;
}

export const TasksBoard = () => {
  const backlogTasks = useSelector((state: RootState) => state.taskList?.tasks.backlog);
  const todoTasks = useSelector((state: RootState) => state.taskList?.tasks.todo);
  const inProgressTasks = useSelector((state: RootState) => state.taskList?.tasks?.in_progress);
  const doneTasks = useSelector((state: RootState) => state.taskList?.tasks?.done);
  const canceledTasks = useSelector((state: RootState) => state.taskList?.tasks?.cancelled);

  const match = useRouteMatch<MatchParams>();
  const { getAccessTokenSilently } = useAuth0();

  // dispatch
  const dispatch = useDispatch<AppDispatch>();
  const onDragEnd = async ({ source, destination, draggableId }: DropResult, provided: ResponderProvided) => {
    if (source.droppableId === destination?.droppableId) return;
    if (!source || !destination)
      return;
    const token = await getAccessTokenSilently();
    dispatch(changeStatusOfTask(draggableId, source.droppableId, destination.droppableId, source.index, destination.index, match.params.id, token));
  };

  // load data
  useEffect(() => {
    // dispatch(loadIssues());
  }, []);

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className='flex flex-1 pt-6 pl-8 overflow-scroll bg-gray-100'>
        <IssueCol title={'Backlog'} status={Status.BACKLOG} tasks={backlogTasks} />
        <IssueCol title={'Todo'} status={Status.TODO} tasks={todoTasks} />
        <IssueCol title={'In Progress'} status={Status.IN_PROGRESS} tasks={inProgressTasks} />
        <IssueCol title={'Done'} status={Status.DONE} tasks={doneTasks} />
        <IssueCol title={'Canceled'} status={Status.CANCELED} tasks={canceledTasks} />
      </div>
    </DragDropContext>
  );
};
