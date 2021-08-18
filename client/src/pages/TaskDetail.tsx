import { LeftSideBar } from 'components/LeftSideBar';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { RightSideBar } from 'components/RightSideBar';
import { ReactComponent as RightSideBarIcon } from 'assets/icons/right-sidebar.svg';
import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { MarkdownStyles } from 'styled/Markdown';
import Editor from "rich-markdown-editor";
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { getTaskDetail } from 'store/actions/taskActions';
import { useAuth0 } from '@auth0/auth0-react';
import { GET_TASK_DETAIL_CLEAR } from 'store/contants/taskConstants';
import CircularProgress from '@material-ui/core/CircularProgress';
interface Props {

}
interface URLParams {
    taskId: string;
    projectId: string;
}

export const TaskDetail: React.FC<Props> = () => {
    const [showMenuLeft, setShowMenuLeft] = useState(false);
    const [showMenuRight, setShowMenuRight] = useState(false);
    const [readOnlyMarkdown, setReadOnlyMarkdown] = useState(true);
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();
    const params = useParams<URLParams>();

    const { projectData } = useSelector((state: RootState) => state.currentProject);
    const { task, loading, error } = useSelector((state: RootState) => state.taskDetail);

    useEffect(() => {
        (async () => {
            const token = await getAccessTokenSilently();
            dispatch(getTaskDetail(token, params.projectId, params.taskId));
        })();
        return () => {
            dispatch({
                type: GET_TASK_DETAIL_CLEAR
            });
        };
    }, [params.projectId, params.taskId, getAccessTokenSilently, dispatch]);

    const onEdit = () => {
        setReadOnlyMarkdown(false);
    };

    return (
        <div className='flex w-screen h-screen overflow-y-hidden'>
            <LeftSideBar showMenu={showMenuLeft} onCloseMenu={() => setShowMenuLeft(false)} />
            <div className='flex flex-row flex-1'>
                <div className='p-0 lg:p-4 flex flex-1'>
                    <div className='flex flex-1 flex-col shadow-modal modal-shadow rounded-md'>
                        {/* Top Close Box */}
                        <div className='border-0 lg:border-b border-gray-200 flex justify-between'>
                            <button
                                className='flex-shrink-0 h-full px-5 focus:outline-none lg:hidden'
                                onClick={() => setShowMenuLeft(!showMenuLeft)}
                            >
                                <MenuIcon className='w-3.5 text-gray-500 hover:text-gray-800' />
                            </button>
                            <div className='flex items-center justify-end p-2'>
                                <Link to={`/projects/${params.projectId}/tasks`}
                                    className='inline-flex items-center justify-center ml-2 text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700 hidden lg:flex'
                                >
                                    <CloseIcon className='w-4' />
                                </Link>
                                <button onClick={() => setShowMenuRight(!showMenuRight)} className='flex-shrink-0 h-full p-2 ml-2 focus:outline-none lg:hidden hover:bg-gray-100'>
                                    <RightSideBarIcon />
                                </button>
                            </div>
                        </div>
                        {loading ? <div className='flex items-center justify-center flex-1'><CircularProgress color="primary" /></div> : error ? <div className='flex items-center justify-center flex-1'>{error}</div> : <>
                            {/* Project Title and current task title */}
                            <div className='px-5 border-b border-gray-200 mt-5 pb-3 flex justify-between items-center'>
                                <p className='font-medium w-10/12 text-gray-700'>{`› ${projectData.project.title}`}</p>
                                <div className='flex'>
                                    {readOnlyMarkdown && <><button onClick={onEdit} className='inline-flex items-center justify-center text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700'><EditIcon /></button><button className='ml-3 inline-flex items-center justify-center text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700'><DeleteIcon /></button></>}
                                    {!readOnlyMarkdown && <><button className='inline-flex items-center justify-center px-2 py-1 transition-all rounded-md ml-2 text-gray-500 hover:bg-gray-100 rouned hover:text-gray-700'>Cancel</button>
                                        <button className='inline-flex items-center justify-center px-2 py-1 transition-all border border-gray-200 rounded-md ml-2 text-gray-500 hover:bg-gray-100 rouned hover:text-gray-700'>Save</button></>}
                                </div>
                            </div>
                            {/* Markdown Description */}
                            <div className='mt-5 pb-3'>
                                <p className='px-5 text-lg font-semibold mt-4 mb-3 text-gray-700'>{task.title}</p>
                                <div className='flex'>
                                    <MarkdownStyles taskDetail>
                                        <Editor
                                            autoFocus
                                            id='editor'
                                            readOnly={readOnlyMarkdown}
                                            defaultValue={task.description}
                                            value={task.description}
                                            className='mt-4 ml-5 font-normal border-none appearance-none min-h-12 text-md focus:outline-none'
                                            placeholder='Add description...'
                                        />
                                    </MarkdownStyles>
                                </div>
                            </div>
                        </>}
                    </div>
                </div>
                <RightSideBar showMenu={showMenuRight} onCloseMenu={() => setShowMenuRight(false)} />
            </div>
        </div>
    );
};
