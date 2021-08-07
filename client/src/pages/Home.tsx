import { LeftSideBar } from 'components/LeftSideBar';
import React, { useState } from 'react';

interface Props {

}

export const Home: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='flex w-full h-screen overflow-y-hidden'>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <h1 className='text-3xl font-sans'>Apples</h1>
      </div>
    </div>
  );
};
