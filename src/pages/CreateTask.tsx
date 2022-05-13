import { useAuth0 } from '@auth0/auth0-react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { ReactComponent as OwnerIcon } from 'assets/icons/avatar.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as GitIssueIcon } from 'assets/icons/git-issue.svg';
import { ReactComponent as LabelIcon } from 'assets/icons/label.svg';
import axios from 'axios';
import { LeftSideBar } from 'components/LeftSideBar';
import { AssigneeMenu } from 'components/menus/AssigneeMenu';
import { LabelMenu } from 'components/menus/LabelMenu';
import { PriorityMenu } from 'components/menus/PriorityMenu';
import { StatusMenu } from 'components/menus/StatusMenu';
import { PriorityIcon } from 'components/PriorityIcon';
import { StatusIcon } from 'components/StatusIcon';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import Editor from 'rich-markdown-editor';
import { Label, Member } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import { getPriorityString } from 'shared/utils/common';
import { formatDate } from 'shared/utils/formatDate';
import socket from 'shared/utils/socket';
import { RootState } from 'store/store';
import { MarkdownStyles } from 'styled/Markdown';
import { showError, showInfo, showWarning } from '../components/Notification';
import { DEFAULT_LABLES, Priority, Status } from '../shared/constants';

interface RouteParams {
    projectId: string;
}
interface Props extends RouteComponentProps<RouteParams> {}

export const CreateTask: React.FC<Props> = ({ match, history, location }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(Priority.NO_PRIORITY);
    const [status, setStatus] = useState(location?.state?.status || Status.BACKLOG);
    const [label, setLabel] = useState(DEFAULT_LABLES[3]);
    const [assignee, setAssignee] = useState<Member>();
    const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(() => {
        const date = new Date();
        const newDate = new Date(Number(date));
        newDate.setDate(date.getDate() + 10);
        return newDate;
    });
    const [startDate, setStartDate] = useState<MaterialUiPickersDate>(new Date());

    // Date Pickers
    const [isOpenStartDate, setIsOpenStartDate] = useState(false);
    const [isOpenDueDate, setIsOpenDueDate] = useState(false);

    const { projectData } = useSelector((state: RootState) => state.currentProject);
    const { memberList } = useSelector((state: RootState) => state);
    const memberIds = memberList.members.map((member: Member) => member._id);

    const { getAccessTokenSilently } = useAuth0();

    const onAssigneeSelect = (member: Member) => {
        setAssignee(member);
    };

    const onStartDatePick = () => {
        setIsOpenStartDate(true);
    };
    const onDueDatePick = () => {
        setIsOpenDueDate(true);
    };

    const handleSubmit = async () => {
        if (title === '') {
            showWarning('Please enter a title before submiting', 'Title required');
            return;
        }
        const body = {
            title,
            priority,
            status,
            label: label.name,
            assignee: assignee?._id,
            description,
            startDate,
            dueDate
        };
        try {
            showWarning('Please wait!', 'Creating Task...');
            const token = await getAccessTokenSilently();

            const { data } = await axios({
                url: `${baseURL}${endpoints.projects}/${match.params.projectId}${endpoints.tasks}`,
                method: 'POST',
                data: body,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            socket.emit('create_task_update', { newTask: data, member: projectData._id, memberIds });
        } catch (e) {
            showError('', 'Error Creating Task.');
        }
        setTitle('');
        setDescription('');
        setPriority(Priority.NO_PRIORITY);
        setStatus(Status.BACKLOG);
        showInfo('You created new task.', 'Task created');

        history.push(`/projects/${projectData.project._id}/tasks`);
    };

    useEffect(() => {
        const buyCoffee = document.getElementById('bmc-wbtn');
        if (buyCoffee) {
            buyCoffee.style.opacity = '0';
            buyCoffee.style.visibility = 'hidden';
        }
        return () => {
            const buyCoffee = document.getElementById('bmc-wbtn');
            if (buyCoffee) {
                buyCoffee.style.opacity = '1';
                buyCoffee.style.visibility = 'visible';
            }
        };
    }, []);

    return (
        <>
            <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
            <div className="flex flex-col flex-grow">
                <div className="flex flex-col w-full py-4 flex-1">
                    {/* header */}
                    <div className="flex items-center justify-between flex-shrink-0 px-4">
                        <div className="flex items-center">
                            <span className="inline-flex items-center p-1 text-gray-400 bg-gray-100 rounded">
                                <GitIssueIcon className="w-3 mr-1" />
                                <span>{projectData.project.title}</span>
                            </span>
                            <span className="ml-2 font-normal text-gray-700">› New Task</span>
                        </div>
                        <div className="flex items-center">
                            <Link
                                to={`/projects/${projectData.project._id}/tasks`}
                                className="inline-flex items-center justify-center ml-2 text-gray-500 h-7 w-7 hover:bg-gray-100 rouned hover:text-gray-700"
                            >
                                <CloseIcon className="w-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 pb-3.5 overflow-y-auto">
                        {/* Task title */}
                        <div className="flex items-center w-full mt-1.5 px-4">
                            <StatusMenu
                                id="status-menu"
                                button={
                                    <button className="flex items-center justify-center w-6 h-6 border-none rounded focus:outline-none hover:bg-gray-100">
                                        <StatusIcon status={status} />
                                    </button>
                                }
                                onSelect={st => {
                                    setStatus(st);
                                }}
                            />
                            <input
                                className="w-full ml-1.5 text-lg font-semibold placeholder-gray-400 border-none h-7 focus:outline-none"
                                placeholder="Task title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Task description editor */}
                        <div className="flex px-4">
                            <MarkdownStyles>
                                <Editor
                                    autoFocus
                                    id="editor"
                                    defaultValue={description}
                                    onChange={value => setDescription(value())}
                                    className="mt-4 ml-5 font-normal border-none appearance-none min-h-12 text-md focus:outline-none"
                                    placeholder="Add description..."
                                />
                            </MarkdownStyles>
                        </div>
                    </div>

                    {/* Task labels & priority */}
                    <div className="flex items-center px-4 pb-3 mt-1 border-b border-gray-200 flex-wrap">
                        <PriorityMenu
                            // id='priority-menu'
                            button={
                                <button className="mt-2 inline-flex items-center h-6 px-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700 mr-2">
                                    <PriorityIcon priority={priority} className="mr-2" />
                                    <span>{getPriorityString(priority)}</span>
                                </button>
                            }
                            onSelect={val => setPriority(val)}
                        />

                        <AssigneeMenu
                            button={
                                <button className="mt-2 inline-flex items-center h-6 px-2 mr-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700">
                                    {!assignee ? (
                                        <>
                                            <OwnerIcon className="w-3.5 h-3.5 mr-2" />
                                            <span>Assignee</span>
                                        </>
                                    ) : (
                                        <>
                                            <OwnerIcon className="w-3.5 h-3.5 mr-2" />
                                            <span>{`${assignee.user.firstName} ${assignee.user.lastName}`}</span>
                                        </>
                                    )}
                                </button>
                            }
                            onSelect={onAssigneeSelect}
                        />

                        <LabelMenu
                            id="label-menu"
                            onSelect={(label: Label) => setLabel(label)}
                            button={
                                <button className="mt-2 inline-flex items-center h-6 px-2 mr-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700">
                                    {label.name === 'No Label' ? (
                                        <>
                                            <LabelIcon className="w-3.5 h-3.5  mr-2" /> <span>No Label</span>{' '}
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className="w-2.5 h-2.5 rounded-full mr-2"
                                                style={{ background: label.color }}
                                            ></div>{' '}
                                            <span>{label.name}</span>{' '}
                                        </>
                                    )}
                                </button>
                            }
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disablePast
                                open={isOpenStartDate}
                                onOpen={() => setIsOpenStartDate(true)}
                                onClose={() => setIsOpenStartDate(false)}
                                TextFieldComponent={() => null}
                                variant="dialog"
                                onChange={(date: MaterialUiPickersDate) => setStartDate(date)}
                                value={startDate}
                            />
                            <button
                                onClick={onStartDatePick}
                                className="mt-2 inline-flex items-center h-6 px-2 mr-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700"
                            >
                                {startDate ? `Start Date: ${formatDate(startDate)}` : 'Start Date'}
                            </button>
                            <DatePicker
                                disablePast
                                open={isOpenDueDate}
                                onOpen={() => setIsOpenDueDate(true)}
                                onClose={() => setIsOpenDueDate(false)}
                                TextFieldComponent={() => null}
                                variant="dialog"
                                onChange={(date: MaterialUiPickersDate) => setDueDate(date)}
                                value={dueDate}
                            />
                            <button
                                onClick={onDueDatePick}
                                className="mt-2 inline-flex items-center h-6 px-2 mr-2 text-gray-500 bg-gray-200 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700"
                            >
                                {dueDate ? `Due Date: ${formatDate(dueDate)}` : 'Due Date'}
                            </button>
                        </MuiPickersUtilsProvider>
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between flex-shrink-0 px-4 pt-3 w-full">
                        <div className="flex items-center w-full">
                            <button
                                className="px-3 ml-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 h-7 focus:outline-none ml-auto"
                                onClick={handleSubmit}
                            >
                                Save Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
