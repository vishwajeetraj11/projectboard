import React from 'react';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

interface Props {
  projectData: {
    access: string;
    project: {
      _id: string,
      title: string,
      description: string;
    };
  };
}

export const ProjectCard: React.FC<Props> = ({ projectData }) => {
  return (
    <div className='py-4 px-5 bg-indigo-600 rounded-sm mt-2'>
      <h2 className='text-lg text-white font-medium'>{projectData.project.title}</h2>
      <p className='text-sm text-white font-normal'>{projectData.project.description}</p>
      <div className="flex mt-4">
        <Link className='mr-2 sm:mr-4' to={`/projects/${projectData.project._id}/tasks`}>
          <Button className='flex items-center'><LaunchIcon className='w-5 h-5 text-white' color='action' /><p className='ml-2 text-xs text-white'>Open</p></Button>
        </Link>
        {projectData.access === 'admin' && (<> <Link className='mr-2 sm:mr-4' to='/edit-project'>
          <Button className='flex items-center'><EditRoundedIcon className='w-5 h-5 text-white' color='action' /><p className='ml-2 text-xs text-white'>Edit</p></Button>
        </Link>
          <Button className='flex items-center'><DeleteIcon className='w-5 h-5 text-white' color='action' /><p className='ml-2 text-xs text-white'>Delete</p></Button></>)}
      </div>
    </div>
  );
};
