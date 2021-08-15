import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { baseURL, endpoints } from 'shared/urls';
import { useState } from 'react';
import { ProjectCard } from 'components/projects/ProjectCard';
import { projectsType } from 'shared/constants';
import { Loader } from 'components/Loader';

interface Props {
  type: string;
}

export const ProjectsList: React.FC<Props> = ({ type }) => {
  const [projectsData, setProjectsData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const { data } = await axios({
          url: `${type === projectsType.MyProjects ? `${baseURL}${endpoints.getMyProjects}` : `${baseURL}${endpoints.getSharedProjects}`}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjectsData(data.projects);
      } catch (e) {
        console.log(e);
        setError(e?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [getAccessTokenSilently, type]);
  return (
    <div>
      {loading ? <div className='w-full flex items-center justify-center' style={{ height: "50vh" }}><Loader /></div> : error ? <p>{error}</p> : projectsData.length === 0 ? <div className='w-full flex items-center justify-center' style={{ height: "50vh" }}>No Projects to show.</div> : React.Children.toArray(projectsData.map((project: any) => (
        <ProjectCard projectData={project} />
      )))}
    </div>
  );
};
