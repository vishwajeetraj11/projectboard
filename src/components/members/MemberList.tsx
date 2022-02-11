import { useAuth0 } from '@auth0/auth0-react';
import { useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import { Loader } from 'components/Loader';
import { MemberRow } from 'components/members/MemberRow';
import { MembersColHeader } from 'components/members/MembersColHeader';
import { showError, showInfo, showWarning } from 'components/Notification';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Member } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';

interface Props {}

interface MatchParams {
    projectId: string;
}

export const MemberList: React.FC<Props> = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [members, setMembers] = useState([]);
    const { getAccessTokenSilently } = useAuth0();
    const match = useRouteMatch<MatchParams>();
    const isMobile = useMediaQuery('(max-width:600px)');

    // Delete Member API states
    const [deleteMemberLoading, setDeleteMemberLoading] = useState(false);

    const onDeleteMember = async (memberId: string) => {
        try {
            setDeleteMemberLoading(true);
            showWarning('', 'Deleting Member...');
            const token = await getAccessTokenSilently();
            await axios({
                url: `${baseURL}${endpoints.projects}/${match.params.projectId}${endpoints.members}/${memberId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMembers(mems => mems.filter((mem: Member) => mem._id !== memberId));
            showInfo('', 'Member Deleted Successfully.');
        } catch (e) {
            showError(e?.response?.data?.message, 'Error Deleting Member.');
        } finally {
            setDeleteMemberLoading(false);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const token = await getAccessTokenSilently();
                const { data } = await axios({
                    url: `${baseURL}${endpoints.projects}/${match.params.projectId}${endpoints.members}`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMembers(data.members);
            } catch (e) {
                setError(e?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        })();
    }, [getAccessTokenSilently, match.params.projectId]);

    return (
        <>
            {members.length !== 0 && <MembersColHeader isMobile={isMobile} />}
            {loading ? (
                <div className="w-full flex items-center justify-center" style={{ height: '50vh' }}>
                    <Loader />
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                React.Children.toArray(
                    members.map((member: Member) => (
                        <MemberRow
                            onDeleteMember={onDeleteMember}
                            disableDeleteButton={deleteMemberLoading}
                            isMobile={isMobile}
                            member={member}
                        />
                    ))
                )
            )}
        </>
    );
};
