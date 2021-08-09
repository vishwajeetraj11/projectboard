import React, { useEffect } from 'react';
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
// import { loadIssues, updateIssueStatusAndPos } from 'store/actions/issueActions';
import { Status } from 'shared/constants';
import { AppDispatch, RootState } from '../../store/store';
import { IssueCol } from './BoardColumn';


export const TasksBoard = () => {
  const backlogTasks = useSelector((state: RootState) => state.taskList?.tasks.backlog);
  const todoTasks = useSelector((state: RootState) => state.taskList?.tasks.todo);
  const inProgressTasks = useSelector((state: RootState) => state.taskList?.tasks?.in_progress);
  const doneTasks = useSelector((state: RootState) => state.taskList?.tasks?.done);
  const canceledTasks = useSelector((state: RootState) => state.taskList?.tasks?.cancelled);

  // dispatch
  const dispatch = useDispatch<AppDispatch>();
  const onDragEnd = ({ source, destination, draggableId }: DropResult, provided: ResponderProvided) => {
    console.log({ source, destination, draggableId });
    if (!source || !destination)
      return;
    // dispatch(updateIssueStatusAndPos('', source.droppableId, destination.droppableId, source.index, destination.index));
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
