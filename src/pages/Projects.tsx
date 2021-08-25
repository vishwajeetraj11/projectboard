import { MinimalNav } from 'components/layout/minimalNav';
import { ProjectsList } from 'components/projects/ProjectList';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsType } from 'shared/constants';
interface Props {

}


export const Projects: React.FC<Props> = () => {
  const [activeProjects, setActiveProjects] = useState(projectsType.MyProjects);

  const toggleProjectsActive = (projectType: string) => {
    if (projectType === activeProjects) return;
    setActiveProjects(projectType);
  };

  return (
    <section className='p-4 lg:p-0 w-full min-h-screen max-w-screen-lg mx-auto bg-white overflow-auto '>
      {/* Nav */}
      <MinimalNav />
      <div className='bg-gray-100 w-full rounded-sm'>
        <Link to='/create-project'>
          <p className='text-md py-3 text-center font-semibold text-gray-500'>
            + Create A Project
          </p>
        </Link>
      </div>
      <div className='flex justify-between w-full mt-4 bg-gray-100'>
        <button className={`w-6/12 rounded-sm py-3 font-medium text-xs ${activeProjects === projectsType.MyProjects ? 'bg-indigo-600 text-white' : ''}`} onClick={() => toggleProjectsActive(projectsType.MyProjects)}>My Projects</button>
        <button className={`w-6/12 rounded-sm py-3 font-medium text-xs ${activeProjects === projectsType.Shared ? 'bg-indigo-600 text-white' : ''}`} onClick={() => toggleProjectsActive(projectsType.Shared)}>Shared Projects</button>
      </div>
      <div className='mt-4'>
        {activeProjects === projectsType.MyProjects && <ProjectsList type={projectsType.MyProjects} />}
        {activeProjects === projectsType.Shared && <ProjectsList type={projectsType.Shared} />}
      </div>
    </section>
  );
};
