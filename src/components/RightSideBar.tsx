import { useAuth0 } from '@auth0/auth0-react';
import DateFnsUtils from '@date-io/date-fns';
import { CircularProgress } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
// import { ReactComponent as ViewIcon } from 'assets/icons/view.svg';
import { ReactComponent as OwnerIcon } from 'assets/icons/avatar.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
// import { Label } from 'shared/types';
import { ReactComponent as LabelIcon } from 'assets/icons/label.svg';
import classNames from 'classnames';
import { AssigneeMenu } from 'components/menus/AssigneeMenu';
import { LabelMenu } from 'components/menus/LabelMenu';
import { PriorityMenu } from 'components/menus/PriorityMenu';
import { StatusMenu } from 'components/menus/StatusMenu';
import { showError, showInfo } from 'components/Notification';
import { PriorityIcon } from 'components/PriorityIcon';
import { StatusIcon } from 'components/StatusIcon';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Label, Member } from 'shared/types';
import { getLabelObj, getPriorityString, getStatusText } from 'shared/utils/common';
import { formatDate } from 'shared/utils/formatDate';
import { getTaskDetail, updateTaskMicroProperties } from 'store/actions/taskActions';
import { UPDATE_TASK_MICRO_PROPS_CLEAR } from 'store/contants/taskConstants';
import { RootState } from 'store/store';
interface Props {
  // Show menu (for small screen only)
  showMenu: boolean;
  onCloseMenu?: () => void;
  onCreateIssue?: Function;
  onOpenHelp?: Function;
  onOpenInviteBox?: Function;
}

interface URLParams {
  taskId: string;
  projectId: string;
}


export const RightSideBar: React.FC<Props> = ({ showMenu, onCloseMenu }) => {

  const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  const { task } = useSelector((state: RootState) => state.taskDetail);
  const { error, loading, success } = useSelector((state: RootState) => state.updateTask);
  const dispatch = useDispatch();
  const params = useParams<URLParams>();
  const { getAccessTokenSilently } = useAuth0();
  const classes = classNames(
    `absolute lg:static inset-0 transform duration-300 lg:relative lg:translate-x-0 bg-white flex flex-col flex-shrink-0 w-80 font-sans text-sm text-gray-700 border-l border-gray-100 lg:shadow-none justify-items-start h-screen`,
    {
      '-translate-x-full ease-out shadow-none': !showMenu,
      'translate-x-0 ease-in shadow-xl': showMenu
    }
  );
  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(task.startDate);
  const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [label, setLabel] = useState(task.label);
  const [status, setStatus] = useState(task.status);
  const [assignee, setAssignee] = useState<Member>(task.assignee);
  const [edited, setEdited] = useState(false);

  // Date Pickers
  const [isOpenStartDate, setIsOpenStartDate] = useState(false);
  const [isOpenDueDate, setIsOpenDueDate] = useState(false);

  const onStartDatePick = () => {
    setIsOpenStartDate(true);
  };
  const onDueDatePick = () => {
    setIsOpenDueDate(true);
  };


  let ready = false;
  useClickOutside(ref, () => {
    if (ready && showMenu && onCloseMenu)
      onCloseMenu();
  });

  const onCancel = useCallback(() => {
    setPriority(task.priority);
    setLabel(task.label);
    setDueDate(task.dueDate);
    setStartDate(task.startDate);
    setAssignee(task.assignee);
    setStatus(task.status);
    setEdited(false);
  }, [task]);
  const onSave = async () => {
    const fieldsToUpdate = {
      status: task.status !== status,
      priority: task.priority !== priority,
      startDate: task.startDate !== startDate,
      dueDate: task.dueDate !== dueDate,
      label: task.label !== label,
      assignee: task?.assignee?.user?._id !== assignee?.user?._id
    };
    const body: any = {};
    if (fieldsToUpdate.dueDate) body.dueDate = dueDate;
    if (fieldsToUpdate.startDate) body.startDate = startDate;
    if (fieldsToUpdate.assignee) body.assignee = assignee._id;
    if (fieldsToUpdate.priority) body.priority = priority;
    if (fieldsToUpdate.status) body.status = status;
    if (fieldsToUpdate.label) body.label = label;

    const token = await getAccessTokenSilently();
    dispatch(updateTaskMicroProperties(params.taskId, params.projectId, token, body));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => ready = true, 300);
  });
  useEffect(() => {
    if (priority !== task.priority) setEdited(true);
    if (label !== task.label) setEdited(true);
    if (status !== task.status) setEdited(true);
    if (startDate !== task.startDate) setEdited(true);
    if (dueDate !== task.dueDate) setEdited(true);
    if (assignee?.user?._id !== task?.assignee?.user?._id) setEdited(true);
  }, [priority, label, status, assignee, edited, task.priority, task.label, task.status, task.startDate, task.dueDate, startDate, dueDate, task?.assignee?.user?._id]);

  useEffect(() => {
    if (error) {
      showError('Please try again later.', 'Unable to Update Task.');
      onCancel();
      dispatch({ type: UPDATE_TASK_MICRO_PROPS_CLEAR });
    }
    if (success) {
      showInfo('', 'Task Updated Successfully');
      setEdited(false);
      getAccessTokenSilently().then(token => {
        dispatch(getTaskDetail(token, params.projectId, params.taskId));
        dispatch({ type: UPDATE_TASK_MICRO_PROPS_CLEAR });
      });
    }
  }, [success, error, onCancel, dispatch, getAccessTokenSilently, params]);

  return (
    <>
      <div className={classes} style={{ zIndex: 3 }} ref={ref}>
        <button
          className='flex-shrink-0 px-5 ml-2 lg:hidden h-14 focus:outline-none'
          onClick={onCloseMenu}
        >
          <CloseIcon className='w-4' />
        </button>

        {/* Top menu*/}
        {loading ? <div className='flex items-center justify-center flex-1'><CircularProgress color="primary" /></div> : <div className='flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3 pt-10'>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-gray-400 font-medium w-28'>Status</p>
            <div className='flex items-center mr-auto'>
              <StatusMenu
                id='status-menu'
                button={<button className='flex items-center justify-center w-6 h-6 border-none rounded focus:outline-none hover:bg-gray-100'><StatusIcon status={status} /></button>}
                onSelect={(st) => {
                  setStatus(st);
                }}
              />
              <p className='text-gray-500 ml-2'>{getStatusText(status)}</p>
            </div>
          </div>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-gray-400 font-medium w-28'>Priority</p>
            <div className='flex items-center mr-auto'>
              <PriorityMenu
                // id='priority-menu'
                button={<button
                  className='inline-flex items-center h-6 px-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'
                >
                  {priority && <PriorityIcon priority={priority} />}
                </button>}
                onSelect={(val) => setPriority(val)}
              />
              <p className='text-gray-500 ml-2'>{getPriorityString(priority)}</p>
            </div>
          </div>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-gray-400 font-medium w-28'>Assignee</p>
            <div className='flex items-center mr-auto'>
              <AssigneeMenu
                button={<button className='inline-flex items-center h-6 px-2 mr-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                  {!assignee ? <><OwnerIcon className='w-3.5 h-3.5 mr-2' />
                    <span>Unassigned</span></> : <><OwnerIcon className='w-3.5 h-3.5 mr-2' />
                    <span>{`${assignee?.user?.firstName} ${assignee?.user?.lastName}`}</span></>}
                </button>}
                onSelect={(assignee: Member) => setAssignee(assignee)}
              />
            </div>
          </div>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-gray-400 font-medium w-28'>Label</p>
            <div className='flex items-center mr-auto'>
              <LabelMenu
                id='label-menu'
                onSelect={(label: Label) => setLabel(label.name)}
                button={<button className='inline-flex items-center h-6 px-2 mr-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                  {label === 'No Label' ? <><LabelIcon className='w-3.5 h-3.5  mr-2' /> <span>No Label</span> </> : <><div className="w-2.5 h-2.5 rounded-full mr-2" style={{ background: getLabelObj(label)?.color }}></div> <span>{getLabelObj(label)?.name}</span> </>}
                </button>} />
            </div>
          </div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <div className='flex justify-between items-center mb-6'>
              <p className='text-gray-400 font-medium w-28'>Start Date</p>
              <div className='flex items-center mr-auto'>
                <DatePicker
                  disablePast
                  open={isOpenStartDate}
                  onOpen={() => setIsOpenStartDate(true)}
                  onClose={() => setIsOpenStartDate(false)}
                  TextFieldComponent={() => null}
                  variant='dialog'
                  onChange={(date: MaterialUiPickersDate) => setStartDate(date)}
                  value={startDate}
                />
                <button onClick={onStartDatePick} className='inline-flex items-center h-6 px-2 mr-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                  {startDate ? `${formatDate(startDate)}` : "Start Date"}
                </button>
              </div>
            </div>
            <div className='flex justify-between items-center mb-6'>
              <p className='text-gray-400 font-medium w-28'>Due Date</p>
              <div className='flex items-center mr-auto'>
                <DatePicker
                  disablePast
                  open={isOpenDueDate}
                  onOpen={() => setIsOpenDueDate(true)}
                  onClose={() => setIsOpenDueDate(false)}
                  TextFieldComponent={() => null}
                  variant='dialog'
                  onChange={(date: MaterialUiPickersDate) => setDueDate(date)}
                  value={dueDate}
                />
                <button onClick={onDueDatePick} className='inline-flex items-center h-6 px-2 mr-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                  {dueDate ? `${formatDate(dueDate)}` : "Due Date"}
                </button>
              </div>
            </div>
            <div className='flex justify-around mt-4'>
              {edited && <><button onClick={onCancel} className='inline-flex items-center justify-center px-4 py-2 transition-all rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100 rouned hover:text-gray-700 w-28'>Cancel</button>
                <button onClick={onSave} className='ml-3 inline-flex items-center justify-center px-4 py-2 transition-all duration-400 bg-indigo-700 rounded-md  hover:bg-indigo-800 rouned w-5/12 text-white'>Save</button></>}
            </div>
          </MuiPickersUtilsProvider>
        </div>}
      </div>
    </>
  );
};
