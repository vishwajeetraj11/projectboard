import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress } from '@material-ui/core';
import { HistoryRow } from 'components/history/HistoryRow';
import { LeftSideBar } from 'components/LeftSideBar';
import { TopFilter } from 'components/TopFilter';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { topFilterType } from 'shared/constants';
import { User_Populated_History } from 'shared/types';
import { getProjectHistory } from 'store/actions/historyActions';
import { RootState } from 'store/store';

interface RouteParams { projectId: string; }

interface Props extends RouteComponentProps<RouteParams> {

}


export const ProjectHistory: React.FC<Props> = ({ match }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { history, loading, error } = useSelector((state: RootState) => state.projectHistory);
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      dispatch(getProjectHistory(token, match.params.projectId));
    })();
  }, [dispatch, getAccessTokenSilently, match.params.projectId]);

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} type={topFilterType.HISTORY} title='Project History' />
        {
          loading
            ? <div className='flex items-center justify-center flex-1'><CircularProgress color="primary" /></div>
            : error
              ? <div className='flex items-center justify-center flex-1'>{error}</div>
              : !history.length
                ? <div className='flex items-center justify-center flex-1'>
                  No History yet.
                </div>
                : <div className='flex flex-col flex-1 overflow-y-scroll pb-20'>
                  {React.Children.toArray(history.map((hist: User_Populated_History) =>
                    <HistoryRow history={hist} />
                  ))}
                </div>
        }
      </div>
    </>
  );
};
