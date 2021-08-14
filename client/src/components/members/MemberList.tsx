import { useAuth0 } from '@auth0/auth0-react';
import { useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import { Loader } from 'components/Loader';
import { MemberRow } from 'components/members/MemberRow';
import { MembersColHeader } from 'components/members/MembersColHeader';
import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Member } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';

interface Props {

}

interface MatchParams {
  id: string;
}

export const MemberList: React.FC<Props> = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const match = useRouteMatch<MatchParams>();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const { data } = await axios({
          url: `${baseURL}${endpoints.projects}/${match.params.id}${endpoints.members}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers(data.members);
      } catch (e) {
        setError(e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [getAccessTokenSilently, match.params.id]);

  return (
    <>
      {members.length !== 0 && <MembersColHeader isMobile={isMobile} />}
      {loading ? <div className='w-full flex items-center justify-center' style={{ height: "50vh" }}><Loader /></div> : error ? <p>{error}</p> : React.Children.toArray(members.map((member: Member) => (
        <MemberRow isMobile={isMobile} member={member} />
      )))}
    </>
  );
};
