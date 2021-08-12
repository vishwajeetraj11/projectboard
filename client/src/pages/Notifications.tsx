import { LeftSideBar } from 'components/LeftSideBar';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface RouteParams { id: string; }

interface Props extends RouteComponentProps<RouteParams> {

}


export const Notifications: React.FC<Props> = ({ match }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <div className='flex flex-col w-full py-4 flex-1'>
          {JSON.stringify(match)}
        </div>
      </div>
    </>
  );
};
