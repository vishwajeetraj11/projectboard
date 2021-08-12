import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { showError } from 'components/Notification';
import React, { useEffect, useState } from 'react';
import { AuthenticatedRoutes } from 'routes/AuthenticatedRoutes';
import { UnauthenticatedRoutes } from 'routes/Unauthenticated';
import { baseURL, endpoints } from 'shared/urls';
import { history } from 'shared/utils/history';

// interface Props extends RouteComponentProps<{}> {

// }
interface Props {

}

export const Routes: React.FC<Props> = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (!user) { history.push('/'); return; }

    if (user && !(window.location.pathname === '/edit-profile')) {
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          const { data } = await axios({
            url: `${baseURL}${endpoints.profile}`,
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const username = data?.user?.username;
          const firstName = data?.user?.firstName;
          const lastName = data?.user?.lastName;
          if (!username || !firstName || !lastName) {
            // history.push('/edit-profile');
            window.location.replace('/edit-profile');
          } else {
            setAuthenticated(true);
          }
        } catch (e) {
          showError('Could not fetch your profile. Please try again sometime later.', 'Profile Error');
        }
      })();
    }
  }, [user, getAccessTokenSilently]);

  return (
    <>
      {authenticated ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes setAuthenticated={setAuthenticated} />}
    </>
  );
};
