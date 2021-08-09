import { Board } from 'pages/Board';
import { CreateTask } from 'pages/CreateTask';
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
        <Route path='/tasks' exact component={Tasks} />
        <Route path='/board' exact component={Board} />
        <Route path='/create-task' exact component={CreateTask} />
        <Route path='/profile' exact component={TestProfile} />
        <Redirect path='*' to='/tasks' />
      </Switch>
    </div>
  );
};
