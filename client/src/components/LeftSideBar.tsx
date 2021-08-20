import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as CancelIcon } from 'assets/icons/cancel.svg';
import { ReactComponent as BacklogIcon } from 'assets/icons/circle-dot.svg';
import { ReactComponent as TodoIcon } from 'assets/icons/circle.svg';
import { ReactComponent as DoneIcon } from 'assets/icons/done.svg';
import { ReactComponent as InProgressIcon } from 'assets/icons/half-circle.svg';
import { ReactComponent as HelpIcon } from 'assets/icons/help.svg';
import { ReactComponent as InboxIcon } from 'assets/icons/inbox.svg';
import { ReactComponent as IssueIcon } from 'assets/icons/issue.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
// import { ReactComponent as ViewIcon } from 'assets/icons/view.svg';
import classNames from 'classnames';
import HelpModal from 'components/HelpModal';
import { SearchBox } from 'components/SearchBox';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { CgBoard } from "react-icons/cg";
import { MdKeyboardArrowDown as ExpandMore } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';
import { Avatar } from './Avatar';
import { ItemGroup } from './ItemGroup';
import { ProfileMenu } from './menus/ProfileMenu';

interface Props {
  // Show menu (for small screen only)
  showMenu: boolean;
  onCloseMenu?: () => void;
  onCreateIssue?: Function;
  onOpenHelp?: Function;
  onOpenInviteBox?: Function;
}


export const LeftSideBar: React.FC<Props> = ({ showMenu, onCloseMenu }) => {

  const { projectData } = useSelector((state: RootState) => state.currentProject);

  const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  let classes = classNames(
    'absolute lg:static inset-0 transform duration-300 lg:relative lg:translate-x-0 bg-white flex flex-col flex-shrink-0 w-56 font-sans text-sm text-gray-700 border-r border-gray-100 lg:shadow-none justify-items-start',
    {
      '-translate-x-full ease-out shadow-none': !showMenu,
      'translate-x-0 ease-in shadow-xl': showMenu
    }
  );

  let ready = false;
  useClickOutside(ref, () => {
    if (ready && showMenu && onCloseMenu)
      onCloseMenu();
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => ready = true, 300);
  });

  return (
    <>
      <div className={classes} style={{ zIndex: 1000 }} ref={ref}>
        <button
          className='flex-shrink-0 px-5 ml-2 lg:hidden h-14 focus:outline-none'
          onClick={onCloseMenu}
        ><MenuIcon className='w-3.5 text-gray-500 hover:text-gray-800' /></button>

        {/* Top menu*/}
        <div className='flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3'>
          <div className="flex items-center justify-between">
            {/* Project selection */}
            <div className="flex items-center p-2 pr-3 rounded cursor-pointer hover:bg-gray-100">
              <div className='flex text-sm items-center justify-center rounded-sm w-4.5 h-4.5 text-white bg-yellow-500 mr-2.5'>W</div>
              <div className='text-sm font-medium'>Workspace</div>
            </div>

            {/* User avatar  */}
            <div className='relative'>
              <div className='flex items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-100 select-none'
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <Avatar name='Tuan Nguyen' online={true} />
                <ExpandMore size={13} className='ml-2' />
              </div>
              <ProfileMenu isOpen={showProfileMenu} onDismiss={() => setShowProfileMenu(false)} className='absolute top-10' />
            </div>
          </div>

          {/* Create issue btn */}
          <Link to={`/projects/${projectData.project._id}/create-task`}
            className='inline-flex items-center px-2 py-2 mt-3 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none h-7'
          >
            <AddIcon className='mr-2.5 w-3.5 h-3.5' /> New Task
          </Link>
        </div>

        {/* Search box */}
        <div className='flex flex-col flex-shrink flex-grow overflow-y-auto mb-0.5 px-4'>
          <SearchBox className='mt-5' />
          {/* actions */}
          <Link to={`/projects/${projectData.project._id}/notifications`} className='group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer'>
            <InboxIcon className='w-3.5 h-3.5 mr-4 text-sm text-gray-500 group-hover:text-gray-600' />
            <span>Notifications</span>
          </Link>
          <Link to={`/projects/${projectData.project._id}/tasks`} className='group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer'>
            <IssueIcon className='w-3.5 h-3.5 mr-4 text-gray-500 group-hover:text-gray-600' />
            <span>Tasks</span>
          </Link>
          {/* <Link to='/' className='group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer'>
            <ViewIcon className='w-3.5 h-3.5 mr-4 text-gray-500 group-hover:text-gray-600' />
            <span>Views</span>
          </Link> */}
          <Link to={`/projects/${projectData.project._id}/board`} className='group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer'>
            <CgBoard className='w-3.5 h-3.5 mr-4 text-gray-500 group-hover:text-gray-600' />
            <span>Board</span>
          </Link>

          {/* Teams */}
          <h3 className='px-2 mt-5 text-xs text-gray-500'
          >Your Tasks</h3>

          <ItemGroup title='Status'>
            <Link to='/' className='flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100'>
              {/* <FiCircle className='w-3.5 h-3.5 mr-2 text-gray-500 group-hover:text-gray-600' /> */}
              <TodoIcon className='w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700' />
              <span>To Do</span>
            </Link>
            <Link to='/' className='flex items-center pl-8 rounded cursor-pointer h-7 hover:bg-gray-100'>
              {/* <span className='w-3 h-3 mr-2' ></span> */}
              <BacklogIcon className='w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700' />
              <span>Backlog</span>
            </Link>
            <Link to='/' className='flex items-center pl-8 rounded cursor-pointer h-7 hover:bg-gray-100'>
              {/* <span className='w-3 h-3 mr-2' ></span> */}
              <InProgressIcon className='w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700' />
              <span>In Progress</span>
            </Link>

            <Link to='/' className='flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100'>
              {/* <ArchiveIcon className='w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700' /> */}
              <DoneIcon className='w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700' />
              <span>Done</span>
            </Link>
            <Link to='/' className='flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100'>
              {/* <ArchiveIcon className='w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700' /> */}
              <CancelIcon className='w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700' />
              <span>Cancelled</span>
            </Link>
          </ItemGroup>

          {/* extra space */}
          <div className='flex flex-col flex-grow flex-shrink' />

          {/* bottom group */}
          <div className='px-2 pb-2 text-gray-500 mt-7'>
            <Link
              to={`/projects/${projectData.project._id}/members`}
              className='flex items-center focus:outline-none'
            ><AddIcon className='w-3 mr-2' /> Manage Members</Link>
            <button
              className='flex items-center mt-1 focus:outline-none cursor-pointer'
              onClick={() => setShowHelpModal(true)}
            ><HelpIcon className='w-3 mr-2 mt-0.5' /> Help & Feedback</button>
          </div>
        </div>
      </div>
      {/* Modals */}
      {<HelpModal isOpen={showHelpModal} onDismiss={() => setShowHelpModal(false)} />}
    </>
  );
};
