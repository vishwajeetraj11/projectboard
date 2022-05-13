import { Board } from 'pages/Board';
import { CreateProject } from 'pages/CreateProject';
import { CreateTask } from 'pages/CreateTask';
import { EditProfile } from 'pages/EditProfile';
import { EditProject } from 'pages/EditProject';
import { ManageMembers } from 'pages/ManageMembers';
import { ProjectHistory } from 'pages/ProjectHistory';
import { Projects } from 'pages/Projects';
import { TaskDetail } from 'pages/TaskDetail';
import { TaskHistory } from 'pages/TaskHistory';
import { Tasks } from 'pages/Tasks';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import socket from 'shared/utils/socket';
import {
    updateBoardAfterSocketEvent,
    updateTaskAfterDeleteSocketEvent,
    updateTasksAfterSocketEvent
} from 'store/actions/taskActions';

interface Props {}

export const AuthenticatedRoutes: React.FC<Props> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('delete_update', ({ taskId }: any) => {
            dispatch(updateTaskAfterDeleteSocketEvent(taskId));
        });
        socket.on('board_update', ({ updatedTask }: any) => {
            dispatch(updateBoardAfterSocketEvent(updatedTask));
        });
        socket.on('create_update', ({ newTask }: any) => {
            dispatch(updateTasksAfterSocketEvent(newTask));
        });
    }, [dispatch]);

    return (
        <div className="flex w-full h-screen overflow-y-hidden">
            <Switch>
                <Route path="/projects" exact component={Projects} />
                <Route path="/edit-project" exact component={EditProject} />
                <Route path="/create-project" exact component={CreateProject} />
                <Route path="/projects/:projectId/tasks" exact component={Tasks} />
                <Route path="/projects/:projectId/tasks/:taskId" exact component={TaskDetail} />
                <Route path="/projects/:projectId/board" exact component={Board} />
                <Route path="/projects/:projectId/create-task" exact component={CreateTask} />
                <Route path="/projects/:projectId/members" exact component={ManageMembers} />
                <Route path="/history/projects/:projectId" exact component={ProjectHistory} />
                <Route path="/history/projects/:projectId/tasks/:taskId" exact component={TaskHistory} />
                <Route path="/edit-profile" exact component={EditProfile} />
                <Redirect path="*" to="/projects" />
            </Switch>
        </div>
    );
};
