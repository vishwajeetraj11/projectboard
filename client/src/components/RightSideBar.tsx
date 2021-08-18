import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
// import { ReactComponent as ViewIcon } from 'assets/icons/view.svg';
import { ReactComponent as OwnerIcon } from 'assets/icons/avatar.svg';
import classNames from 'classnames';
import { AssigneeMenu } from 'components/menus/AssigneeMenu';
import { PriorityMenu } from 'components/menus/PriorityMenu';
import { StatusMenu } from 'components/menus/StatusMenu';
import { PriorityIcon } from 'components/PriorityIcon';
import { StatusIcon } from 'components/StatusIcon';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLabelObj, getPriorityString, getStatusText } from 'shared/utils/common';
import { RootState } from 'store/store';
import { LabelMenu } from 'components/menus/LabelMenu';
import { Label } from 'shared/types';
import { ReactComponent as LabelIcon } from 'assets/icons/label.svg';
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { formatDate } from 'shared/utils/formatDate';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
interface Props {
  // Show menu (for small screen only)
  showMenu: boolean;
  onCloseMenu?: () => void;
  onCreateIssue?: Function;
  onOpenHelp?: Function;
  onOpenInviteBox?: Function;
}


export const RightSideBar: React.FC<Props> = ({ showMenu, onCloseMenu }) => {

  const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  const { task, loading, success, error } = useSelector((state: RootState) => state.taskDetail);

  let classes = classNames(
    `absolute lg:static inset-0 transform duration-300 lg:relative lg:translate-x-0 bg-white flex flex-col flex-shrink-0 w-72 font-sans text-sm text-gray-700 border-l border-gray-100 lg:shadow-none justify-items-start`,
    {
      '-translate-x-full ease-out shadow-none': !showMenu,
      'translate-x-0 ease-in shadow-xl': showMenu
    }
  );
  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(task.startDate || new Date());
  const [dueDate, setDueDate] = useState<MaterialUiPickersDate>(task.dueDate);
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

  //FIXME: why we need add some delay here?
  useEffect(() => {
    setTimeout(() => ready = true, 300);
  });
  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className={classes} style={{ zIndex: 1 }} ref={ref}>
        <button
          className='flex-shrink-0 px-5 ml-2 lg:hidden h-14 focus:outline-none'
          onClick={onCloseMenu}
        >
          <CloseIcon className='w-4' />
        </button>

        {/* Top menu*/}
        <div className='flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3 pt-10'>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-gray-400 font-medium w-28'>Status</p>
            <div className='flex items-center mr-auto'>
              <StatusMenu
                id='status-menu'
                button={<button className='flex items-center justify-center w-6 h-6 border-none rounded focus:outline-none hover:bg-gray-100'><StatusIcon status={task.status} /></button>}
              // onSelect={(st) => {
              //   setStatus(st);
              // }}
              />
              <p className='text-gray-500 ml-2'>{getStatusText(task.status)}</p>
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
                  {task.priority && <PriorityIcon priority={task?.priority} />}
                </button>}
              // onSelect={(val) => setPriority(val)}
              />
              <p className='text-gray-500 ml-2'>{getPriorityString(task.priority)}</p>
            </div>
          </div>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-gray-400 font-medium w-28'>Assignee</p>
            <div className='flex items-center mr-auto'>
              <AssigneeMenu
                button={<button className='inline-flex items-center h-6 px-2 mr-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                  {!task.assignee ? <><OwnerIcon className='w-3.5 h-3.5 mr-2' />
                    <span>Unassigned</span></> : <><OwnerIcon className='w-3.5 h-3.5 mr-2' />
                    <span>{`${task?.assignee?.user?.firstName} ${task?.assignee?.user?.lastName}`}</span></>}
                </button>}
              // onSelect={onAssigneeSelect}
              />
            </div>
          </div>
          <div className='flex justify-between items-center mb-6'>
            <p className='text-gray-400 font-medium w-28'>Label</p>
            <div className='flex items-center mr-auto'>
              <LabelMenu
                id='label-menu'
                // onSelect={(label: Label) => setLabel(label)}
                button={<button className='inline-flex items-center h-6 px-2 mr-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                  {task.label === 'No Label' ? <><LabelIcon className='w-3.5 h-3.5  mr-2' /> <span>No Label</span> </> : <><div className="w-2.5 h-2.5 rounded-full mr-2" style={{ background: getLabelObj(task.label)?.color }}></div> <span>{getLabelObj(task.label)?.name}</span> </>}
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
                  value={task.dueDate}
                />
                <button onClick={onDueDatePick} className='inline-flex items-center h-6 px-2 mr-2 text-gray-500 border-none rounded focus:outline-none hover:bg-gray-100 hover:text-gray-700'>
                  {task.dueDate ? `${formatDate(task.dueDate)}` : "Due Date"}
                </button>
              </div>
            </div>
          </MuiPickersUtilsProvider>
        </div>
      </div>
    </>
  );
};
