import { LeftSideBar } from 'components/LeftSideBar';
import { AddMembers } from 'components/members/AddMembers';
import { MemberList } from 'components/members/MemberList';
import { TopFilter } from 'components/TopFilter';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { topFilterType, userType } from 'shared/constants';
import { RootState } from 'store/store';

interface RouteParams {
    projectId: string;
}

interface Props extends RouteComponentProps<RouteParams> {}

export const ManageMembers: React.FC<Props> = () => {
    const { projectData } = useSelector((state: RootState) => state.currentProject);
    const [showMenu, setShowMenu] = useState(false);

    const [activeUsers, setActiveUsers] = useState(userType.MEMBER);

    const toggleUsersActive = (userType: string) => {
        if (userType === activeUsers) return;
        setActiveUsers(userType);
    };

    return (
        <>
            <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
            <div className="flex flex-col flex-grow">
                <div className="flex flex-col w-full flex-1">
                    <TopFilter
                        onOpenMenu={() => setShowMenu(!showMenu)}
                        title="Manage Members"
                        type={topFilterType.INVITE}
                    />
                    <div className="flex flex-col p-5 pl-10 flex-1">
                        <div>
                            <h2 className="font-semibold text-xl mb-2">
                                Project Title: {projectData.project.title}
                            </h2>
                        </div>
                        <h2 className="text-md">Manage Members</h2>
                        <div className="flex justify-between w-full mt-4 bg-gray-100 my-4">
                            <button
                                className={`w-6/12 rounded-sm py-3 font-medium text-xs ${
                                    activeUsers === userType.MEMBER ? 'bg-indigo-600 text-white' : ''
                                }`}
                                onClick={() => toggleUsersActive(userType.MEMBER)}
                            >
                                Members
                            </button>
                            {projectData.access === 'admin' && (
                                <button
                                    className={`w-6/12 rounded-sm py-3 font-medium text-xs ${
                                        activeUsers === userType.USER ? 'bg-indigo-600 text-white' : ''
                                    }`}
                                    onClick={() => toggleUsersActive(userType.USER)}
                                >
                                    Add Members
                                </button>
                            )}
                        </div>
                        {activeUsers === userType.MEMBER && <MemberList />}
                        {activeUsers === userType.USER && <AddMembers />}
                    </div>
                </div>
            </div>
        </>
    );
};
