import { LogoutButton } from 'components/auth/Logout';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useEffect } from 'react';
interface Props {

}

export const Home: React.FC<Props> = () => {
  const [showMenu, setShowMenu] = useState(false);
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const [token, setToken] = useState('');

  getAccessTokenSilently().then((r) => setToken(r));
  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const { data } = await axios({
        url: `${serverUrl}/api/v1/tasks`,
        // url: `https://vishwajeetraj11.us.auth0.com/userinfo`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>
      <LogoutButton />
      <p>Home</p>
    </div>
  );
};
