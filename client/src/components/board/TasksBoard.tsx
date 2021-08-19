import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Status } from 'shared/constants';
import { Task } from 'shared/types';
import { changeStatusOfTask, updateBoardAfterSocketEvent } from 'store/actions/taskActions';
import { AppDispatch, RootState } from '../../store/store';
import { IssueCol } from './BoardColumn';
import socket from 'shared/utils/socket';

interface MatchParams {
  id: string;
}

export const TasksBoard = () => {
  const backlogTasks: Array<Task> = useSelector((state: RootState) => state.taskList?.tasks.backlog);
  const todoTasks: Array<Task> = useSelector((state: RootState) => state.taskList?.tasks.todo);
  const inProgressTasks: Array<Task> = useSelector((state: RootState) => state.taskList?.tasks?.in_progress);
  const doneTasks: Array<Task> = useSelector((state: RootState) => state.taskList?.tasks?.done);
  const canceledTasks: Array<Task> = useSelector((state: RootState) => state.taskList?.tasks?.cancelled);

  const todoSorted: Array<Task> = todoTasks.sort((prev: Task, next: Task) => prev.order - next.order);
  const backlogSorted: Array<Task> = backlogTasks.sort((prev: Task, next: Task) => prev.order - next.order);
  const inProgressSorted: Array<Task> = inProgressTasks.sort((prev: Task, next: Task) => prev.order - next.order);
  const doneSorted: Array<Task> = doneTasks.sort((prev: Task, next: Task) => prev.order - next.order);
  const cancelledSorted: Array<Task> = canceledTasks.sort((prev: Task, next: Task) => prev.order - next.order);

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

  useEffect(() => {
    socket.on('board_update', ({ updatedTask }: any) => {
      dispatch(updateBoardAfterSocketEvent(updatedTask));
    });
  }, [dispatch]);

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      <div className='flex flex-1 pt-6 pl-8 overflow-scroll bg-gray-100'>
        <IssueCol title={'Backlog'} status={Status.BACKLOG} tasks={backlogSorted} />
        <IssueCol title={'Todo'} status={Status.TODO} tasks={todoSorted} />
        <IssueCol title={'In Progress'} status={Status.IN_PROGRESS} tasks={inProgressSorted} />
        <IssueCol title={'Done'} status={Status.DONE} tasks={doneSorted} />
        <IssueCol title={'Canceled'} status={Status.CANCELED} tasks={cancelledSorted} />
      </div>
    </DragDropContext>
  );
};
