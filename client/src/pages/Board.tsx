import { LeftSideBar } from 'components/LeftSideBar';
import { TopFilter } from 'components/TopFilter';
import React, { useState } from 'react';

interface Props {

}

export const Board: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} title='Board' />
      </div>
    </>
  );
};
