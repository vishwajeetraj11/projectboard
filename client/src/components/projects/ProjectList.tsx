import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { baseURL, endpoints } from 'shared/urls';
import { useState } from 'react';
import { ProjectCard } from 'components/projects/ProjectCard';
import { projectsType } from 'shared/constants';

interface Props {
  type: string;
}

export const ProjectsList: React.FC<Props> = ({ type }) => {
  const [projectsData, setProjectsData] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    (async () => {
      try {
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
      }
    })();
  }, [getAccessTokenSilently, type]);
  return (
    <div>
      {React.Children.toArray(projectsData.map((project: any) => (
        <ProjectCard projectData={project} />
      )))}
    </div>
  );
};
