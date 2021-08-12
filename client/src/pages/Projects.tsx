import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { LogoutButton } from 'components/auth/Logout';
import React, { Suspense } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL, endpoints } from 'shared/urls';

interface Props {

}

const projectsType = {
  MyProjects: "MY_PROJECT", // The projects that the loggedIn user created (i.e. projects in which loggedin user is admin.)
  Shared: "SHARED_PROJECTS", // The projects that is shared with the loggedIn user (i.e. projects in which loggedin user is just a member.)
};

export const Projects: React.FC<Props> = () => {
  const [activeProjects, setActiveProjects] = useState(projectsType.MyProjects);

  const toggleProjectsActive = (projectType: string) => {
    if (projectType === activeProjects) return;
    setActiveProjects(projectType);
  };

  return (
    <div>
      <LogoutButton />
      <Link to='/create-project'>Create A Projects</Link>
      <div className='flex justify-center'>
        <button onClick={() => toggleProjectsActive(projectsType.MyProjects)}>My Projects</button>
        <button onClick={() => toggleProjectsActive(projectsType.Shared)}>Shared Projects</button>
      </div>
      <div>
        {activeProjects === projectsType.MyProjects && <MyProjects />}
        {activeProjects === projectsType.Shared && <SharedProjects />}
      </div>
    </div>
  );
};

const MyProjects: React.FC<Props> = () => {
  // TODO: Make req. fetch projects from backend
  const [projects, setProjects] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await axios({
          url: `${baseURL}${endpoints.getMyProjects}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(data.projects);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div>
      <h1 className='mt-10'> My projects</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {React.Children.toArray(projects.map((project: any) => (
          <div>{JSON.stringify(project, undefined, 2)}</div>
        )))}
      </Suspense>
    </div>
  );
};
const SharedProjects: React.FC<Props> = () => {
  return (
    <div>

    </div>
  );
};
