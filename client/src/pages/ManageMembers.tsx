import { useAuth0 } from '@auth0/auth0-react';
import { Button, useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import { LeftSideBar } from 'components/LeftSideBar';
import { Loader } from 'components/Loader';
import { TopFilter } from 'components/TopFilter';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { topFilterType } from 'shared/constants';
import { Member } from 'shared/types';
import { baseURL, endpoints } from 'shared/urls';
import { RootState } from 'store/store';
import { MembersColHeader } from 'components/members/MembersColHeader';
import { MemberRow } from 'components/members/MemberRow';

interface RouteParams { id: string; }

interface Props extends RouteComponentProps<RouteParams> {

}


export const ManageMembers: React.FC<Props> = ({ match }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);

  const { projectData } = useSelector((state: RootState) => state.currentProject);

  const { getAccessTokenSilently } = useAuth0();

  const onInvite = async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      const config = {
        Authorization: `Bearer ${token}`,
      };
      console.log(config);
      const { data } = await axios({
        url: `${baseURL}${endpoints.projects}/${match.params.id}${endpoints.members}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMembers(data.members);
    } catch (e) {
      console.log(error);
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <div className='flex flex-col w-full flex-1'>
          <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} title='Invite' type={topFilterType.INVITE} />
          <div className='flex flex-col p-5 pl-10 flex-1'>
            <div>
              <h2 className='font-semibold text-xl mb-2'>Project Title: {projectData.project.title}</h2>
            </div>
            <h2 className='text-md'>Manage Members</h2>
            <div className='flex items-center my-4'>
              <Button className='w-6/12' color='primary' onClick={onInvite}>Members</Button>
              <Button className='w-6/12' color='primary' onClick={onInvite}>Invite</Button>
            </div>
            {members.length !== 0 && <MembersColHeader isMobile={isMobile} />}
            {loading ? <div className='w-full flex items-center justify-center' style={{ height: "50vh" }}><Loader /></div> : error ? <p>{error}</p> : React.Children.toArray(members.map((member: Member) => (
              <MemberRow isMobile={isMobile} member={member} />
            )))}
          </div>
        </div>
      </div>
    </>
  );
};
