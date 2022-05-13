import { useAuth0 } from '@auth0/auth0-react';
import { LeftSideBar } from 'components/LeftSideBar';
import { TaskList } from 'components/tasks/TaskList';
import { TopFilter } from 'components/TopFilter';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { topFilterType } from 'shared/constants';
import socket from 'shared/utils/socket';
import { getAllMembers } from 'store/actions/memberActions';
import { getAllTasks } from 'store/actions/taskActions';
import { RootState } from 'store/store';

interface RouteParams {
    projectId: string;
}
interface Props extends RouteComponentProps<RouteParams> {}

export const Tasks: React.FC<Props> = ({ match }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();
    const { projectData } = useSelector((state: RootState) => state.currentProject);

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            dispatch(getAllTasks(token, match.params.projectId));
            dispatch(getAllMembers(token, match.params.projectId));
            socket.emit('member-loggedIn', { member: projectData._id });
        })();
    }, [dispatch, getAccessTokenSilently, match.params.projectId, projectData._id]);

    return (
        <>
            <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
            <div className="flex flex-col flex-grow">
                <TopFilter
                    onOpenMenu={() => setShowMenu(!showMenu)}
                    type={topFilterType.TASKS}
                    title="All Tasks"
                />
                <TaskList />
            </div>
        </>
    );
};
