import { StatusIcon } from 'components/StatusIcon';
import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { GoPlus as AddIcon } from 'react-icons/go';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Task } from 'shared/types';
import { BoardItem } from './BoardItem';

interface Props {
    status: string;
    title: string;
    tasks: Array<Task> | undefined;
}
interface MatchParams {
    projectId: string;
}

export const IssueCol = ({ title, status, tasks }: Props) => {
    let statusIcon = <StatusIcon status={status} />;

    let tasksItems = (tasks || []).map((task, idx) => <BoardItem task={task} index={idx} />);

    const history = useHistory();
    const match = useRouteMatch<MatchParams>();

    const onAddClick = () => {
        history.push(`/projects/${match.params.projectId}/create-task`, {
            status
        });
    };

    return (
        <div className="flex flex-col flex-shrink-0 mr-3 select-none w-90">
            <div className="flex items-center justify-between pb-3 text-sm">
                {/* left info */}
                <div className="flex items-center">
                    {statusIcon}
                    <span className="ml-3 mr-3 font-medium">{title}</span>
                    <span className="mr-3 font-normal text-gray-400">{tasks?.length || 0}</span>
                </div>

                {/* action buttons */}
                <div className="flex items-center">
                    <button
                        onClick={onAddClick}
                        className="flex items-center justify-center border-none rounded h-7 w-7 hover:bg-gray-200 focus:outline-none"
                    >
                        <AddIcon className="w-3.5 text-gray-400 hover:text-gray-700" />
                    </button>
                </div>
            </div>
            <Droppable droppableId={status} key={status} type="category">
                {(provided: DroppableProvided) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex flex-col flex-1 w-full overflow-y-auto border-gray-200 pt-0.5"
                        >
                            {React.Children.toArray(tasksItems)}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
};
