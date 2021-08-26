import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import LaunchIcon from '@material-ui/icons/Launch';
import axios from 'axios';
import { ProjectDeleteModal } from 'components/modals/ProjectDeleteModal';
import { showError, showInfo, showWarning } from 'components/Notification';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Member } from 'shared/types';
import { baseURL } from 'shared/urls';
import { setCurrentProject } from 'store/actions/projectActions';

interface Props {
  projectData: Member;
  setProjectsData: React.Dispatch<React.SetStateAction<never[]>>;
}

export const ProjectCard: React.FC<Props> = ({ projectData, setProjectsData }) => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const onOpen = () => {
    dispatch(setCurrentProject(projectData));
  };
  const onEdit = () => {
    dispatch(setCurrentProject(projectData));
  };

  const { getAccessTokenSilently } = useAuth0();

  const onDelete = async () => {
    showWarning('Please wait while the project is being deleted.', 'Deleting Project');
    try {
      setShowModal(false);
      const token = await getAccessTokenSilently();
      await axios({
        url: `${baseURL}/projects/${projectData.project._id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showInfo('', 'Project Deleted Successfully');
      setProjectsData((p: any) => p.filter((pdata: any) => {
        return pdata.project._id !== projectData.project._id;
      }));
    } catch (e) {
      showError(e?.response?.data?.message, 'Error Deleting Project.');
    }
  };

  return (
    <>
      <div className='py-4 px-5 bg-indigo-600 rounded-sm mt-2'>
        <h2 className='text-lg text-white font-medium'>{projectData.project.title}</h2>
        <p className='text-sm text-white font-normal'>{projectData.project.description}</p>
        <div className="flex mt-4">
          <Link className='mr-2 sm:mr-4' to={`/projects/${projectData.project._id}/tasks`}>
            <Button onClick={onOpen} className='flex items-center'><LaunchIcon className='w-5 h-5 text-white' color='action' /><p className='ml-2 text-xs text-white'>Open</p></Button>
          </Link>
          {projectData.access === 'admin' && (<> <Link className='mr-2 sm:mr-4' to='/edit-project'>
            <Button onClick={onEdit} className='flex items-center'><EditRoundedIcon className='w-5 h-5 text-white' color='action' /><p className='ml-2 text-xs text-white'>Edit</p></Button>
          </Link>
            <Button onClick={() => setShowModal(true)} className='flex items-center'><DeleteIcon className='w-5 h-5 text-white' color='action' /><p className='ml-2 text-xs text-white'>Delete</p></Button></>)}
        </div>
      </div>
      <ProjectDeleteModal onDelete={onDelete} isOpen={showModal} onDismiss={() => setShowModal(false)} />
    </>
  );
};
