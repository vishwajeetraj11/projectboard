import { Avatar } from 'components/Avatar';
import { PriorityMenu } from 'components/menus/PriorityMenu';
import { StatusMenu } from 'components/menus/StatusMenu';
import { PriorityIcon } from 'components/PriorityIcon';
import { StatusIcon } from 'components/StatusIcon';
import { Link, useRouteMatch } from 'react-router-dom';
// import { ContextMenuTrigger } from 'react-contextmenu';
import { Task } from 'shared/types';
import { getLabelObj } from 'shared/utils/common';
import { formatDate } from 'shared/utils/formatDate';

interface Props {
    task: Task;
}

interface MatchParams {
    projectId: string;
}

export const TaskRow = ({ task }: Props) => {
    const match = useRouteMatch<MatchParams>();

    const statusIcon = <StatusIcon status={task.status} />;

    const labelObj = getLabelObj(task.label);

    let avatar = task.assignee ? (
        <Avatar name={`${task?.assignee?.user?.firstName} ${task?.assignee?.user?.lastName}`} />
    ) : (
        <Avatar />
    );

    return (
        <>
            <Link to={`/projects/${match.params.projectId}/tasks/${task._id}`}>
                <div
                    key={task._id}
                    className="inline-flex items-center flex-grow flex-shrink w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-gray-100 h-11"
                    id={task._id}
                >
                    {/* <div className='flex-shrink-0 hidden ml-2 sm:block'>
            <input type='checkbox' className='rounded-sm appearance-none form-checkbox focus:ring-transparent focus:outline-none form-stick checked:bg-indigo-600 checked:border-transparent border border-gray-300 md:border-transparent hover:border-gray-600 w-3.5 h-3.5' />
          </div> */}
                    <div className="flex-shrink-0 ml-2">
                        <PriorityMenu
                            button={
                                <div className="flex-shrink-0 ml-2">
                                    <PriorityIcon priority={task.priority} />
                                </div>
                            }
                        />
                    </div>
                    <div className="flex-shrink-0 ml-2">
                        <StatusMenu id={'r-status-' + task._id} button={statusIcon} disabled />
                    </div>
                    <div className="flex-wrap flex-shrink ml-2 overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
                        {task.title.substr(0, 100) || ''}
                    </div>
                    <div className="flex flex-grow ml-2"></div>
                    {labelObj?.name !== 'No Label' && (
                        <div className="select-none flex items-center px-3 py-0.5 text-gray-500 focus:outline-none hover:text-gray-800 hover:bg-gray-100 cursor-pointer border-solid border-gray-100 border-2 rounded-xl mr-3">
                            <div
                                className="w-2 h-2 rounded-full mr-2"
                                style={{ background: labelObj?.color }}
                            >
                                &nbsp;
                            </div>
                            <div className="text-xs">{labelObj?.name}</div>
                        </div>
                    )}
                    <div className="flex-shrink-0 hidden w-max ml-2 mr-3 font-normal sm:block">
                        {formatDate(task.startDate)}
                    </div>
                    <div className="flex-shrink-0 ml-auto">{avatar}</div>
                    {/* <div>{`${task?.assignee?.user?.username}`}</div> */}
                </div>
            </Link>
        </>
    );
};
