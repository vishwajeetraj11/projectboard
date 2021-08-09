import { LogoutButton } from 'components/auth/Logout';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useEffect } from 'react';
import { TopFilter } from 'components/TopFilter';
import { SetStateAction } from 'react';
import { Dispatch } from 'redux';
import { LeftSideBar } from 'components/LeftSideBar';
interface Props {

}

export const Home: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  // const { getAccessTokenSilently } = useAuth0();

  // const [token, setToken] = useState('');

  // getAccessTokenSilently().then((r) => setToken(r));
  // const callApi = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const { data } = await axios({
  //       url: `${serverUrl}/api/v1/tasks`,
  //       // url: `https://vishwajeetraj11.us.auth0.com/userinfo`,
  //       method: 'GET',
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // callApi();
  }, []);

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} title='All issues' />
      </div>
    </>
  );
};
