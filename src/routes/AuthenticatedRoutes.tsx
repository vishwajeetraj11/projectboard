import { Board } from 'pages/Board';
import { CreateProject } from 'pages/CreateProject';
import { CreateTask } from 'pages/CreateTask';
import { ManageMembers } from 'pages/ManageMembers';
import { Projects } from 'pages/Projects';
import { Tasks } from 'pages/Tasks';
import { ProjectHistory } from 'pages/ProjectHistory';
import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TaskDetail } from 'pages/TaskDetail';
import { EditProfile } from 'pages/EditProfile';
import { EditProject } from 'pages/EditProject';
import { TaskHistory } from 'pages/TaskHistory';
import socket from 'shared/utils/socket';
import { useDispatch } from 'react-redux';
import { updateTaskAfterDeleteSocketEvent } from 'store/actions/taskActions';

interface Props {
}

export const AuthenticatedRoutes: React.FC<Props> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('delete_update', ({ taskId }: any) => {
      dispatch(updateTaskAfterDeleteSocketEvent(taskId));
    });
  }, [dispatch]);

  return (
    <div className='flex w-full h-screen overflow-y-hidden'>
      <Switch>
        <Route path='/projects' exact component={Projects} />
        <Route path='/edit-project' exact component={EditProject} />
        <Route path='/create-project' exact component={CreateProject} />
        <Route path='/projects/:id/tasks' exact component={Tasks} />
        <Route path='/projects/:projectId/tasks/:taskId' exact component={TaskDetail} />
        <Route path='/projects/:id/board' exact component={Board} />
        <Route path='/projects/:id/create-task' exact component={CreateTask} />
        <Route path='/projects/:id/members' exact component={ManageMembers} />
        <Route path='/history/projects/:id' exact component={ProjectHistory} />
        <Route path='/history/projects/:projectId/tasks/:taskId' exact component={TaskHistory} />
        <Route path='/edit-profile' exact component={EditProfile} />
        <Redirect path='*' to='/projects' />
      </Switch>
    </div>
  );
};