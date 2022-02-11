import { useAuth0 } from '@auth0/auth0-react';
import { Button, FormHelperText, useMediaQuery } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { UserRow } from 'components/members/UserRow';
import { UsersColHeader } from 'components/members/UsersColHeader';
import { showError, showInfo, showWarning } from 'components/Notification';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { User } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import * as Yup from 'yup';
interface Props {}

// Validation Schema for Add Member form
const ValidationSchema = Yup.object().shape({
    searchTerm: Yup.string().required('Your Search Term cannot be empty.').min(3, 'Search Term is too short.')
});

interface MatchParams {
    projectId: string;
}
export const AddMembers: React.FC<Props> = () => {
    const [users, setUsers] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const isMobile = useMediaQuery('(max-width:600px)');
    const match = useRouteMatch<MatchParams>();
    const [error, setError] = useState(false);

    // Add Member API Call States
    const [addMemberLoading, setAddMemberLoading] = useState(false);

    const onAddMember = async (userId: string) => {
        try {
            setAddMemberLoading(true);
            showWarning('', 'Adding Member...');
            const token = await getAccessTokenSilently();
            await axios({
                url: `${baseURL}${endpoints.projects}/${match.params.projectId}${endpoints.members}/${userId}`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            showInfo('', 'Member Added Successfully.');
        } catch (e) {
            showError(e?.response?.data?.message, 'Error Adding Member.');
        } finally {
            setAddMemberLoading(false);
        }
    };

    return (
        <div>
            <Formik
                initialValues={{
                    searchTerm: ''
                }}
                validateOnChange={true}
                validateOnBlur={false}
                validateOnMount={false}
                validationSchema={ValidationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(async () => {
                        try {
                            setError(false);
                            const token = await getAccessTokenSilently();
                            const { data } = await axios({
                                url: `${baseURL}${endpoints.users}?keyword=${encodeURIComponent(
                                    values.searchTerm
                                )}`,
                                method: 'GET',
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                            setUsers(data.users);
                            resetForm();
                        } catch (e) {
                            setError(e?.response?.data?.message);
                        } finally {
                            setSubmitting(false);
                        }
                    });
                }}
            >
                {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-stretch">
                            <input
                                id="searchTerm"
                                type="text"
                                value={values.searchTerm}
                                onChange={handleChange}
                                className="flex-grow-0 w-full p-4 text-lg border-b border-gray-200 focus:outline-none mr-4"
                                placeholder="Enter username or email..."
                            />
                            <Button variant="outlined" color="primary" type="submit" disabled={isSubmitting}>
                                <SearchIcon />
                            </Button>
                        </div>
                        {errors.searchTerm && (
                            <FormHelperText>
                                <span className="text-red-600">{errors.searchTerm}</span>
                            </FormHelperText>
                        )}
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                    </form>
                )}
            </Formik>
            <div>
                {users.length !== 0 && <UsersColHeader isMobile={isMobile} />}
                {React.Children.toArray(
                    users.map((user: User) => (
                        <UserRow
                            onAddMember={onAddMember}
                            disableAddButton={addMemberLoading}
                            isMobile={isMobile}
                            user={user}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
