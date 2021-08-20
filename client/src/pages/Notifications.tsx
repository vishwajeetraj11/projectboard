import { LeftSideBar } from 'components/LeftSideBar';
import { TopFilter } from 'components/TopFilter';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { topFilterType } from 'shared/constants';

interface RouteParams { id: string; }

interface Props extends RouteComponentProps<RouteParams> {

}


export const Notifications: React.FC<Props> = ({ match }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} type={topFilterType.NOTIFICATIONS} title='Notifications' />
      </div>
    </>
  );
};
