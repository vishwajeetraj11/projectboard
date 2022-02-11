import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as NoPriorityIcon } from 'assets/icons/dots.svg';
import { ReactComponent as HelpIcon } from 'assets/icons/help.svg';
import { ReactComponent as IssueIcon } from 'assets/icons/issue.svg';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { ReactComponent as UrgentPriorityIcon } from 'assets/icons/rounded-claim.svg';
import { ReactComponent as MediumPriorityIcon } from 'assets/icons/signal-medium.svg';
import { ReactComponent as HighPriorityIcon } from 'assets/icons/signal-strong.svg';
import { ReactComponent as LowPriorityIcon } from 'assets/icons/signal-weak.svg';
import classNames from 'classnames';
import HelpModal from 'components/modals/HelpModal';
// import { SearchBox } from 'components/SearchBox';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { BiSortUp } from 'react-icons/bi';
import { CgBoard } from 'react-icons/cg';
import { MdKeyboardArrowDown as ExpandMore } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { addLabelFilter, addPriorityFilter } from 'store/actions/filterActions';
import { RootState } from 'store/store';
import { Avatar } from './Avatar';
import { ItemGroup } from './ItemGroup';
import { ProfileMenu } from './menus/ProfileMenu';

interface Props {
    // Show menu (for small screen only)
    showMenu: boolean;
    onCloseMenu?: () => void;
}

export const LeftSideBar: React.FC<Props> = ({ showMenu, onCloseMenu }) => {
    const { projectId } = useParams<{ projectId: string; taskId: string }>();

    const { projectData } = useSelector((state: RootState) => state.currentProject);
    const { user } = useSelector((state: RootState) => state.userProfile);

    const ref = useRef<HTMLDivElement>() as RefObject<HTMLDivElement>;
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    let classes = classNames(
        'absolute lg:static inset-0 transform duration-300 lg:relative lg:translate-x-0 bg-white flex flex-col flex-shrink-0 w-56 font-sans text-sm text-gray-700 border-r border-gray-100 lg:shadow-none justify-items-start h-screen',
        {
            '-translate-x-full ease-out shadow-none': !showMenu,
            'translate-x-0 ease-in shadow-xl': showMenu
        }
    );

    let ready = false;
    useClickOutside(ref, () => {
        if (ready && showMenu && onCloseMenu) onCloseMenu();
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setTimeout(() => (ready = true), 300);
    });

    const onFilterClick = (type: string, filter: string) => {
        if (type === 'label') {
            history.push(`/projects/${projectId}/tasks`);
            dispatch(addLabelFilter(filter));
        }
        if (type === 'priority') {
            history.push(`/projects/${projectId}/tasks`);
            dispatch(addPriorityFilter(filter));
        }
    };

    return (
        <>
            <div className={classes} style={{ zIndex: 2 }} ref={ref}>
                <button
                    className="flex-shrink-0 px-5 ml-2 lg:hidden h-14 focus:outline-none"
                    onClick={onCloseMenu}
                >
                    <MenuIcon className="w-3.5 text-gray-500 hover:text-gray-800" />
                </button>

                {/* Top menu*/}
                <div className="flex flex-col flex-grow-0 flex-shrink-0 px-5 py-3">
                    <div className="flex items-center justify-between">
                        {/* Project selection */}
                        <div className="flex items-center p-2 pr-3 rounded cursor-pointer hover:bg-gray-100">
                            <div className="flex text-sm items-center justify-center rounded-sm w-4.5 h-4.5 text-white bg-yellow-500 mr-2.5">
                                {projectData?.project?.title?.charAt(0)}
                            </div>
                            <div className="text-sm font-medium flex-wrap flex-shrink overflow-hidden font-medium line-clamp-1 overflow-ellipsis">
                                {projectData?.project?.title?.length > 10
                                    ? projectData?.project?.title?.slice(0, 10) + '...'
                                    : projectData?.project?.title}
                            </div>
                        </div>

                        {/* User avatar  */}
                        <div className="relative">
                            <div
                                className="flex items-center justify-center p-2 rounded cursor-pointer hover:bg-gray-100 select-none"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                            >
                                <Avatar name={`${user?.firstName} ${user?.lastName}`} online={true} />
                                <ExpandMore size={13} className="ml-2" />
                            </div>
                            <ProfileMenu
                                isOpen={showProfileMenu}
                                onDismiss={() => setShowProfileMenu(false)}
                                className="absolute top-10"
                            />
                        </div>
                    </div>

                    <Link
                        to={`/projects/${projectId}/create-task`}
                        className="inline-flex items-center px-2 py-2 mt-3 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:outline-none h-7"
                    >
                        <AddIcon className="mr-2.5 w-3.5 h-3.5" /> New Task
                    </Link>
                </div>

                {/* Search box */}
                <div className="flex flex-col flex-shrink flex-grow overflow-y-auto mb-0.5 px-4">
                    {/* <SearchBox className='mt-5' placeholder='Not Implemented' /> */}
                    {/* actions */}
                    <Link
                        to={`/history/projects/${projectId}`}
                        className="group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer"
                    >
                        <BiSortUp className="w-3.5 h-3.5 mr-4 text-sm text-gray-500 group-hover:text-gray-600" />
                        <span>History</span>
                    </Link>
                    <Link
                        to={`/projects/${projectId}/tasks`}
                        className="group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer"
                    >
                        <IssueIcon className="w-3.5 h-3.5 mr-4 text-gray-500 group-hover:text-gray-600" />
                        <span>Tasks</span>
                    </Link>
                    <Link
                        to={`/projects/${projectId}/board`}
                        className="group relative w-full mt-0.5 py-2 px-2 h-7 flex items-center rounded hover:bg-gray-100 cursor-pointer"
                    >
                        <CgBoard className="w-3.5 h-3.5 mr-4 text-gray-500 group-hover:text-gray-600" />
                        <span>Board</span>
                    </Link>

                    {/* Tasks */}
                    <h3 className="px-2 mt-5 text-xs text-gray-500">Your Tasks</h3>

                    <ItemGroup title="Priority">
                        <button
                            onClick={() => onFilterClick('priority', 'no_priority')}
                            className="flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100"
                        >
                            <NoPriorityIcon className="w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700" />
                            <span>No Priority</span>
                        </button>
                        <button
                            onClick={() => onFilterClick('priority', 'urgent')}
                            className="flex items-center pl-8 rounded cursor-pointer h-7 hover:bg-gray-100"
                        >
                            <UrgentPriorityIcon className="w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700" />
                            <span>Urgent</span>
                        </button>
                        <button
                            onClick={() => onFilterClick('priority', 'high')}
                            className="flex items-center pl-8 rounded cursor-pointer h-7 hover:bg-gray-100"
                        >
                            <HighPriorityIcon className="w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700" />
                            <span>High</span>
                        </button>

                        <button
                            onClick={() => onFilterClick('priority', 'medium')}
                            className="flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100"
                        >
                            <MediumPriorityIcon className="w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700" />
                            <span>Medium</span>
                        </button>
                        <button
                            onClick={() => onFilterClick('priority', 'low')}
                            className="flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100"
                        >
                            <LowPriorityIcon className="w-3 h-3 mr-2 text-gray-500 group-hover:text-gray-700" />
                            <span>Low</span>
                        </button>
                    </ItemGroup>

                    <ItemGroup title="Label">
                        <button
                            onClick={() => onFilterClick('label', 'Bug')}
                            className="flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100"
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full mr-3"
                                style={{ background: '#eb5757' }}
                            />
                            <span>Bug</span>
                        </button>
                        <button
                            onClick={() => onFilterClick('label', 'Feature')}
                            className="flex items-center pl-8 rounded cursor-pointer h-7 hover:bg-gray-100"
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full mr-3"
                                style={{ background: '#bb87fc' }}
                            />
                            <span>Feature</span>
                        </button>
                        <button
                            onClick={() => onFilterClick('label', 'Improvement')}
                            className="flex items-center pl-8 rounded cursor-pointer h-7 hover:bg-gray-100"
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full mr-3"
                                style={{ background: '#4ea7fc' }}
                            />
                            <span>Improvement</span>
                        </button>

                        <button
                            onClick={() => onFilterClick('label', 'No Label')}
                            className="flex items-center pl-8 rounded cursor-pointer group h-7 hover:bg-gray-100"
                        >
                            <div
                                className="w-2.5 h-2.5 rounded-full mr-3"
                                style={{ background: '#999999' }}
                            />
                            <span>No Label</span>
                        </button>
                    </ItemGroup>

                    {/* extra space */}
                    <div className="flex flex-col flex-grow flex-shrink" />

                    {/* bottom group */}
                    <div className="px-2 pb-2 text-gray-500 mt-7">
                        <Link
                            to={`/projects/${projectId}/members`}
                            className="flex items-center focus:outline-none"
                        >
                            <AddIcon className="w-3 mr-2" />
                            {projectData.access === 'admin' ? 'Manage Members' : 'View Members'}
                        </Link>
                        <button
                            className="flex items-center mt-1 focus:outline-none cursor-pointer"
                            onClick={() => {
                                setShowHelpModal(true);
                                onCloseMenu && onCloseMenu();
                            }}
                        >
                            <HelpIcon className="w-3 mr-2 mt-0.5" /> Help & Feedback
                        </button>
                    </div>
                </div>
            </div>
            {/* Modal */}
            {<HelpModal isOpen={showHelpModal} onDismiss={() => setShowHelpModal(false)} />}
        </>
    );
};
