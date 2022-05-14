import { LogoutButton } from 'components/auth/Logout';
import { ProfileForm } from 'components/forms/ProfileForm';
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from 'store/store';

interface Props extends RouteComponentProps<{}> {}

export const EditProfile: React.FC<Props> = () => {
    const { user } = useSelector((state: RootState) => state.userProfile);
    const { projectData } = useSelector((state: RootState) => state.currentProject);

    return (
        <section className="p-4 lg:p-0 w-full min-h-screen max-w-screen-lg mx-auto bg-white">
            <div className="p-y lg:py-10 sm:px-4 lg:px-0 flex items-center justify-between">
                <h2>Project Board</h2>
                <LogoutButton />
            </div>
            <div>
                <ProfileForm
                    user={user}
                    title={'Edit your Profile.'}
                    redirect={
                        projectData?.project?._id ? `/projects/${projectData.project._id}` : '/projects'
                    }
                />
            </div>
        </section>
    );
};
