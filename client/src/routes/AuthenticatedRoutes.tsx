import { LeftSideBar } from 'components/LeftSideBar';
import { Board } from 'pages/Board';
import { CreateTask } from 'pages/CreateTask';
import { Home } from 'pages/Home';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

interface Props {

}

export const AuthenticatedRoutes: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className='flex w-full h-screen overflow-y-hidden'>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/board' exact component={Board} />
          <Route path='/create-task' exact component={CreateTask} />
        </Switch>
      </div>
    </div>
  );
};
