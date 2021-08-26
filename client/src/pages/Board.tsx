import { TasksBoard } from 'components/board/TasksBoard';
import { LeftSideBar } from 'components/LeftSideBar';
import { TopFilter } from 'components/TopFilter';
import React, { useState } from 'react';

interface Props {

}

export const Board: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='flex w-screen h-screen overflow-y-hidden'>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-1 overflow-hidden'>
        <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} title='Board' />
        <TasksBoard />
      </div>
    </div>
  );
};
