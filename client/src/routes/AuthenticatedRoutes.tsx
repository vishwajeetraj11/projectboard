import { Board } from 'pages/Board';
import { CreateProject } from 'pages/CreateProject';
import { CreateTask } from 'pages/CreateTask';
import { Projects } from 'pages/Projects';
import { Tasks } from 'pages/Tasks';
import { TestProfile } from 'pages/TestProfile';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

interface Props {
}

export const AuthenticatedRoutes: React.FC<Props> = () => {
  return (
    <div className='flex w-full h-screen overflow-y-hidden'>
      <Switch>
        <Route path='/projects' exact component={Projects} />
        <Route path='/create-project' exact component={CreateProject} />
        <Route path='/tasks' exact component={Tasks} />
        <Route path='/board' exact component={Board} />
        <Route path='/create-task' exact component={CreateTask} />
        <Route path='/profile' exact component={TestProfile} />
        <Redirect path='*' to='/projects' />
      </Switch>
    </div>
  );
};
