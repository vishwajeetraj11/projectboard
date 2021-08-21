import { ProjectForm } from 'components/forms/ProjectForm';
import { MinimalNav } from 'components/layout/minimalNav';
import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from 'store/store';

interface Props extends RouteComponentProps<{}> {

}

export const EditProject: React.FC<Props> = () => {
  const { projectData } = useSelector((state: RootState) => state.currentProject);

  return (
    <section className='p-4 lg:p-0 w-full min-h-screen max-w-screen-lg mx-auto bg-white'>
      <MinimalNav />
      <div>
        <ProjectForm project={projectData.project} redirect='/projects' title='Edit Project.' type='edit' />
      </div>
    </section>
  );
};
