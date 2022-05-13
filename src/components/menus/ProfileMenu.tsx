import { useAuth0 } from '@auth0/auth0-react';
import { Transition } from '@headlessui/react';
import classnames from 'classnames';
import { useClickOutside } from 'hooks/useClickOutside';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/store';

interface Props {
    isOpen: boolean;
    onDismiss?: Function;
    className?: string;
}
export const ProfileMenu = ({ isOpen, className, onDismiss }: Props) => {
    let classes = classnames(
        'select-none w-53 shadow-modal z-50 flex flex-col py-1 bg-white font-normal rounded text-gray-800',
        className
    );
    const ref = useRef(null);
    let ready = false;

    const { projectData } = useSelector((state: RootState) => state.currentProject);

    const { logout } = useAuth0();

    useClickOutside(ref, () => {
        if (ready && isOpen && onDismiss) {
            onDismiss();
        }
    });

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setTimeout(() => (ready = true), 300);
    });

    return (
        <div ref={ref}>
            <Transition
                show={isOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition easy-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                className={classes}
                style={{ left: '-140px' }}
            >
                <Link to="/projects" className="flex items-center h-8 px-3 hover:bg-gray-100 cursor-pointer">
                    All Projects
                </Link>
                <div className="w-full px-3 my-1 border-b border-gray-200"></div>
                <Link
                    to="/edit-profile"
                    className="flex items-center h-8 px-3 hover:bg-gray-100 cursor-pointer"
                >
                    Edit Profile
                </Link>
                <Link
                    to="/edit-project"
                    className="flex items-center h-8 px-3 hover:bg-gray-100 cursor-pointer"
                >
                    Edit Project
                </Link>
                {projectData.access === 'admin' && (
                    <>
                        <div className="w-full px-3 my-1 border-b border-gray-200"></div>
                        <Link
                            to={`/projects/${projectData.project._id}/members`}
                            className="flex items-center h-8 px-3 hover:bg-gray-100 "
                        >
                            Manage Members
                        </Link>
                    </>
                )}
                <div className="w-full px-3 my-1 border-b border-gray-200"></div>
                <a
                    rel="noreferrer"
                    href="https://hashnode.com/@vishwajeetraj11"
                    target="_blank"
                    className="flex items-center h-8 px-3 hover:bg-gray-100 "
                >
                    Join me on Hashnode
                </a>
                <a
                    rel="noreferrer"
                    href="https://vishwajeetraj11.hashnode.dev/introducing-product-board-a-project-management-platform"
                    target="_blank"
                    className="flex items-center h-8 px-3 hover:bg-gray-100 "
                >
                    Introducing Project Board
                </a>
                <a
                    rel="noreferrer"
                    href="https://github.com/vishwajeetraj11/productboard"
                    target="_blank"
                    className="flex items-center h-8 px-3 hover:bg-gray-100 "
                >
                    Github
                </a>
                <a
                    rel="noreferrer"
                    href="https://www.buymeacoffee.com/vishwajeetraj11"
                    target="_blank"
                    className="flex items-center h-8 px-3 hover:bg-gray-100 "
                >
                    Buy Me a Coffee
                </a>
                <div className="w-full px-3 my-1 border-b border-gray-200"></div>
                <div
                    className="flex items-center h-8 px-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                        logout({
                            returnTo: window.location.origin
                        })
                    }
                >
                    Logout
                </div>
            </Transition>
        </div>
    );
};
