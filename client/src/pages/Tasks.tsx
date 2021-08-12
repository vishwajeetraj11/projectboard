import { useAuth0 } from '@auth0/auth0-react';
import { LeftSideBar } from 'components/LeftSideBar';
import { TaskList } from 'components/tasks/TaskList';
import { TopFilter } from 'components/TopFilter';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getAllTasks } from 'store/actions/taskActions';

interface RouteParams { id: string; }
interface Props extends RouteComponentProps<RouteParams> {

}


export const Tasks: React.FC<Props> = ({ match }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      dispatch(getAllTasks(token, match.params.id));
    })();
  }, [dispatch, getAccessTokenSilently, match.params.id]);

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} title='All issues' />
        <TaskList />
      </div>
    </>
  );
};
