import { useAuth0 } from '@auth0/auth0-react';
import { LeftSideBar } from 'components/LeftSideBar';
import { Board } from 'pages/Board';
import { CreateTask } from 'pages/CreateTask';
import { Home } from 'pages/Home';
import { TestProfile } from 'pages/TestProfile';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

interface Props {
}

export const AuthenticatedRoutes: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='flex w-full h-screen overflow-y-hidden'>
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/board' exact component={Board} />
        <Route path='/create-task' exact component={CreateTask} />
        <Route path='/profile' exact component={TestProfile} />
        <Redirect path='*' to='/home' />
      </Switch>
    </div>
  );
};
