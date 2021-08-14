import { useAuth0 } from '@auth0/auth0-react';
import { ReactComponent as AddSubIssueIcon } from 'assets/icons/add-subissue.svg';
import { ReactComponent as AsigneeIcon } from 'assets/icons/assignee.svg';
import { ReactComponent as TodoIcon } from 'assets/icons/circle-dot.svg';
import { ReactComponent as BacklogIcon } from 'assets/icons/circle.svg';
import { ReactComponent as DeleteIcon } from 'assets/icons/delete.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';
import { ReactComponent as SetDuedateIcon } from 'assets/icons/due-date.svg';
import { ReactComponent as DupplicationIcon } from 'assets/icons/dupplication.svg';
import { ReactComponent as StatusIcon } from 'assets/icons/half-circle.svg';
import { ReactComponent as AddLabelIcon } from 'assets/icons/label.svg';
import { ReactComponent as SetParentIcon } from 'assets/icons/parent-issue.svg';
import { ReactComponent as RelationshipIcon } from 'assets/icons/relationship.svg';
import axios from 'axios';
import { showError, showWarning, showInfo } from 'components/Notification';
import { useState } from 'react';
import { useEffect } from 'react';
import { ContextMenu, MenuItem } from 'react-contextmenu';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { Status } from 'shared/constants';
import { Task } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import { deleteTask } from 'store/actions/taskActions';
import { GET_TASKS_SUCCESS } from 'store/contants/taskConstants';
import { RootState } from 'store/store';

interface MenuItemProp {
  icon: 'status' | 'asignee' | 'label' | 'due-date' | 'parent-issue' | 'sub-issue' | 'relationship' | 'dupplication' | 'todo' | 'backlog' | 'done' | 'delete',
  label: string;
  onClick?: () => void;
  loading: boolean;
}

const ItemIcons = {
  'status': StatusIcon,
  'asignee': AsigneeIcon,
  'label': AddLabelIcon,
  'due-date': SetDuedateIcon,
  'parent-issue': SetParentIcon,
  'sub-issue': AddSubIssueIcon,
  'relationship': RelationshipIcon,
  'dupplication': DupplicationIcon,
  'todo': TodoIcon,
  'backlog': BacklogIcon,
  'done': DoneIcon,
  'delete': DeleteIcon
};
export function MenuItemEle({ icon, label, onClick, loading }: MenuItemProp) {
  let Icon = ItemIcons[icon];
  return (
    <MenuItem onClick={onClick} disabled={loading} className='flex items-center px-2 py-1.5 w-60 focus:outline-none text-gray-500 active:outline-none hover:text-gray-700 cursor-pointer outline-none hover:bg-gray-100'>
      {Icon ? <Icon className='w-4 h-4 mr-3' /> : <span className='w-4 h-4 mr-3'></span>}
      {label}
    </MenuItem>
  );
}
export function MenuTitle({ icon, label }: MenuItemProp) {
  let Icon = ItemIcons[icon];
  return (
    <div className='flex items-center px-2 py-1.5 w-60 focus:outline-none text-gray-500 active:outline-none hover:text-gray-700 cursor-pointer outline-none hover:bg-gray-100'>
      {Icon ? <Icon className='w-4 h-4 mr-3' /> : <span className='w-4 h-4 mr-3'></span>}
      {label}
    </div>
  );
}
interface MatchParams {
  id: string;
}

export const TaskContextMenu = (props: any) => {
  const { id: taskId } = props;
  const dispatch = useDispatch();
  const match = useRouteMatch<MatchParams>();
  const projectId = match.params.id;
  const [loading, setLoading] = useState(false);
  const { tasks: allTasks } = useSelector((state: RootState) => state.taskList);
  let tasks = [...allTasks.backlog, ...allTasks.todo, ...allTasks.in_progress, ...allTasks.done, ...allTasks.cancelled];

  const { getAccessTokenSilently } = useAuth0();
  const onDelete = async () => {
    try {
      setLoading(true);
      showWarning('Deleting Task', 'Deleting...');
      const token = await getAccessTokenSilently();
      await axios({
        url: `${baseURL}${endpoints.projects}/${projectId}${endpoints.tasks}/${taskId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedTasks = tasks.filter((task: Task) => task._id !== taskId);
      const allTasks = {
        todo: [] as Array<Task>,
        backlog: [] as Array<Task>,
        in_progress: [] as Array<Task>,
        done: [] as Array<Task>,
        cancelled: [] as Array<Task>
      };
      updatedTasks.forEach((task: Task) => {
        switch (task.status) {
          case Status.BACKLOG:
            return allTasks.backlog.push(task);
          case Status.CANCELED:
            return allTasks.cancelled.push(task);
          case Status.DONE:
            return allTasks.done.push(task);
          case Status.IN_PROGRESS:
            return allTasks.in_progress.push(task);
          case Status.TODO:
            return allTasks.todo.push(task);
        }
      });
      dispatch({ type: GET_TASKS_SUCCESS, payload: allTasks });
      showInfo('', 'Task Deleted Successfully');
    } catch (e) {
      showError(e?.response?.data?.message, 'Error Deleting Task.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContextMenu id={props.id} className='bg-white rounded shadow-modal'>
      <MenuItemEle loading={loading} icon='status' label='Status' />
      <MenuItemEle loading={loading} icon='asignee' label='Assignee' />
      <MenuItemEle loading={loading} icon='label' label='Labels' />
      <MenuItemEle loading={loading} icon='due-date' label='Set due date...' />
      <MenuItemEle loading={loading} onClick={onDelete} icon='delete' label='Delete' />
    </ContextMenu>
  );
};
