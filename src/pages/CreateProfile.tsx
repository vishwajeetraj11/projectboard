import { LogoutButton } from 'components/auth/Logout';
import { ProfileForm } from 'components/forms/ProfileForm';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
interface Props extends RouteComponentProps<{}> {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateProfile: React.FC<Props> = ({ setAuthenticated }) => {
    return (
        <section className="p-4 lg:p-0 w-full min-h-screen max-w-screen-lg mx-auto bg-white">
            <div className="p-y lg:py-10 sm:px-4 lg:px-0 flex items-center justify-between">
                <h2>Project Board</h2>
                <LogoutButton />
            </div>
            <div>
                <ProfileForm title={'Create your Profile.'} setAuthenticated={setAuthenticated} />
            </div>
        </section>
    );
};
