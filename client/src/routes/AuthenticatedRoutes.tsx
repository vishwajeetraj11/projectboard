import { Board } from 'pages/Board';
import { CreateProject } from 'pages/CreateProject';
import { CreateTask } from 'pages/CreateTask';
import { ManageMembers } from 'pages/ManageMembers';
import { Projects } from 'pages/Projects';
import { Tasks } from 'pages/Tasks';
import { Notifications } from 'pages/Notifications';
import { TestProfile } from 'pages/TestProfile';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TaskDetail } from 'pages/TaskDetail';

interface Props {
}

export const AuthenticatedRoutes: React.FC<Props> = () => {
  return (
    <div className='flex w-full h-screen overflow-y-hidden'>
      <Switch>
        <Route path='/projects' exact component={Projects} />
        <Route path='/create-project' exact component={CreateProject} />
        <Route path='/projects/:id/tasks' exact component={Tasks} />
        <Route path='/projects/:id/tasks/:id' exact component={TaskDetail} />
        <Route path='/projects/:id/board' exact component={Board} />
        <Route path='/projects/:id/create-task' exact component={CreateTask} />
        <Route path='/projects/:id/members' exact component={ManageMembers} />
        <Route path='/projects/:id/notifications' exact component={Notifications} />
        <Route path='/profile' exact component={TestProfile} />
        <Redirect path='*' to='/projects' />
      </Switch>
    </div>
  );
};
