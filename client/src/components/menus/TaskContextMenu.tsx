/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ContextMenu, MenuItem } from 'react-contextmenu';


interface MenuItemProp {
  icon: 'status' | 'asignee' | 'label' | 'due-date' | 'parent-issue' | 'sub-issue' | 'relationship' | 'dupplication' | 'todo' | 'backlog' | 'done' | 'delete',
  label: string;
  onClick?: () => void;
  disabled: boolean;
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
export function MenuItemEle({ icon, label, onClick, disabled }: MenuItemProp) {
  let Icon = ItemIcons[icon];
  return (
    <MenuItem onClick={onClick} disabled={disabled} className='flex items-center px-2 py-1.5 w-60 focus:outline-none text-gray-500 active:outline-none hover:text-gray-700 cursor-pointer outline-none hover:bg-gray-100'>
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

  // const { currentProject, taskList, memberList } = useSelector((state: RootState) => state);
  // let tasks = [...taskList.tasks.backlog, ...taskList.tasks.todo, ...taskList.tasks.in_progress, ...taskList.tasks.done, ...taskList.tasks.cancelled];
  // const currentTask = tasks.find((task: Task) => task._id === taskId);


  return (
    <ContextMenu id={props.id} className='bg-white rounded shadow-modal'>
      <MenuItemEle disabled icon='status' label='Status' />
      <MenuItemEle disabled icon='asignee' label='Assignee' />
      <MenuItemEle disabled icon='label' label='Labels' />
      <MenuItemEle disabled icon='due-date' label='Set due date...' />
    </ContextMenu>
  );
};
