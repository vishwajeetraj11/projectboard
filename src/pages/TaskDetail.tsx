import { useAuth0 } from '@auth0/auth0-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as RightSideBarIcon } from 'assets/icons/right-sidebar.svg';
import axios from 'axios';
import { LeftSideBar } from 'components/LeftSideBar';
import { showError, showInfo, showWarning } from 'components/Notification';
import { RightSideBar } from 'components/RightSideBar';
import React, { useCallback, useEffect, useState } from 'react';
import { BiSortUp } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useParams } from 'react-router-dom';
import Editor from 'rich-markdown-editor';
import { baseURL, endpoints } from 'shared/urls';
import { deleteTask, getTaskDetail } from 'store/actions/taskActions';
import { DELETE_TASK_CLEAR, GET_TASK_DETAIL_CLEAR } from 'store/contants/taskConstants';
import { RootState } from 'store/store';
import { MarkdownStyles } from 'styled/Markdown';

interface Props extends RouteComponentProps<{}> {}

interface URLParams {
    taskId: string;
    projectId: string;
}

export const TaskDetail: React.FC<Props> = ({ history }) => {
    const [showMenuLeft, setShowMenuLeft] = useState(false);
    const [showMenuRight, setShowMenuRight] = useState(false);
    const [readOnlyMarkdown, setReadOnlyMarkdown] = useState(true);
    const { task, loading, error, success } = useSelector((state: RootState) => state.taskDetail);
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();
    const params = useParams<URLParams>();
    // const history = useHistory();
    const { success: deleteSuccess } = useSelector((state: RootState) => state.deleteTask);

    const { projectData } = useSelector((state: RootState) => state.currentProject);
    const [description, setDescription] = useState(task.description);
    const [title, setTitle] = useState(task.title);

    const getTask = useCallback(async () => {
        const token = await getAccessTokenSilently();
        dispatch(getTaskDetail(token, params.projectId, params.taskId));
    }, [dispatch, getAccessTokenSilently, params.projectId, params.taskId]);
    useEffect(() => {
        getTask();
        return () => {
            dispatch({
                type: GET_TASK_DETAIL_CLEAR
            });
        };
    }, [params.projectId, params.taskId, getAccessTokenSilently, dispatch, getTask]);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    useEffect(() => {
        if (deleteSuccess) {
            history.push(`/projects/${params.projectId}/tasks`);
            dispatch({ type: DELETE_TASK_CLEAR });
        }
    }, [deleteSuccess, dispatch, history, params.projectId]);

    useEffect(() => {
        if (readOnlyMarkdown) {
            getTask();
        }
    }, [getTask, readOnlyMarkdown]);

    const onEdit = () => {
        setReadOnlyMarkdown(false);
    };
    const onCancel = () => {
        setReadOnlyMarkdown(true);
        setTitle(task.title);
        setDescription(task.description);
    };

    const onSave = async () => {
        try {
            showWarning('While we save your task.', 'Please Wait.');
            const token = await getAccessTokenSilently();
            await axios({
                url: `${baseURL}${endpoints.projects}/${params.projectId}${endpoints.tasks}/${params.taskId}`,
                method: 'PATCH',
                data: {
                    title,
                    description
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            showInfo('', 'Successfully saved Task.');
            setReadOnlyMarkdown(true);
        } catch (e) {
            onCancel();
            showError(e?.response?.data?.message, 'Error saving Task.');
        }
    };
    const onDelete = async () => {
        const token = await getAccessTokenSilently();
        dispatch(deleteTask(params.taskId, params.projectId, token));
    };
    return (
        <div className="flex w-screen h-screen overflow-y-hidden">
            <LeftSideBar showMenu={showMenuLeft} onCloseMenu={() => setShowMenuLeft(false)} />
            {loading ? (
                <div className="flex items-center justify-center flex-1">
                    <CircularProgress color="primary" />
                </div>
            ) : error ? (
                <div className="flex items-center justify-center flex-1">{error}</div>
            ) : (
                <div className="flex flex-row flex-1">
                    <div className="p-0 lg:p-4 flex flex-1">
                        <div className="flex flex-1 flex-col shadow-modal modal-shadow rounded-md">
                            {/* Top Close Box */}
                            <div className="border-0 lg:border-b border-gray-200 flex justify-between">
                                <button
                                    className="flex-shrink-0 h-full px-5 focus:outline-none lg:hidden"
                                    onClick={() => setShowMenuLeft(!showMenuLeft)}
                                >
                                    <MenuIcon className="w-3.5 text-gray-500 hover:text-gray-800" />
                                </button>
                                <div className="flex items-center justify-end p-2">
                                    <button
                                        onClick={() => window.history.back()}
                                        className="inline-flex items-center justify-center ml-2 text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700 hidden lg:flex"
                                    >
                                        <CloseIcon className="w-4" />
                                    </button>
                                    <button
                                        onClick={() => setShowMenuRight(!showMenuRight)}
                                        className="flex-shrink-0 h-full p-2 ml-2 focus:outline-none lg:hidden hover:bg-gray-100"
                                    >
                                        <RightSideBarIcon />
                                    </button>
                                </div>
                            </div>

                            {/* Project Title and current task title */}
                            <div className="px-5 border-b border-gray-200 mt-2.5 pb-3 flex justify-between items-center">
                                <p className="font-medium w-10/12 text-gray-700">{`› ${projectData.project.title}`}</p>
                                <div className="flex">
                                    {readOnlyMarkdown && (
                                        <>
                                            <Link
                                                to={`/history/projects/${projectData.project._id}/tasks/${task._id}`}
                                                className="inline-flex items-center justify-center text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700"
                                            >
                                                <BiSortUp size={16} />
                                            </Link>
                                            <button
                                                onClick={onEdit}
                                                className="ml-3 inline-flex items-center justify-center text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700"
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                onClick={onDelete}
                                                className="ml-3 inline-flex items-center justify-center text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </>
                                    )}
                                    {!readOnlyMarkdown && (
                                        <>
                                            <button
                                                onClick={onCancel}
                                                className="inline-flex items-center justify-center px-2 py-1 transition-all rounded-md ml-2 text-gray-500 hover:bg-gray-100 rouned hover:text-gray-700"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={onSave}
                                                className="inline-flex items-center justify-center px-2 py-1 transition-all border border-gray-200 rounded-md ml-2 text-gray-500 hover:bg-gray-100 rouned hover:text-gray-700"
                                            >
                                                Save
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* Markdown Description */}
                            <div className="mt-5 pb-3 px-5">
                                {!readOnlyMarkdown ? (
                                    <input
                                        className="px-2 py-1 w-full border border-gray-700 border-dashed rounded focus:outline-none"
                                        value={title}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                ) : (
                                    <p className="text-lg font-semibold mt-4 mb-3 text-gray-700">
                                        {task.title}
                                    </p>
                                )}
                                <div className="flex">
                                    <MarkdownStyles taskDetail>
                                        <Editor
                                            autoFocus
                                            id="editor"
                                            readOnly={readOnlyMarkdown}
                                            // defaultValue={task.description}
                                            value={task.description}
                                            onChange={value => setDescription(value())}
                                            className="mt-4 ml-5 font-normal border-none appearance-none min-h-12 text-md focus:outline-none"
                                            placeholder="Add description..."
                                        />
                                    </MarkdownStyles>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RightSideBar showMenu={showMenuRight} onCloseMenu={() => setShowMenuRight(false)} />
                </div>
            )}
        </div>
    );
};
