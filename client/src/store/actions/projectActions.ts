import { Member } from 'shared/types';
import { SET_CURRENT_PROJECT } from 'store/contants/projectConstants';
import { AppDispatch } from 'store/store';

type TgetAllTasks = (projectData: Member) => void;
export const setCurrentProject: TgetAllTasks = (projectData) => async (dispatch: AppDispatch) => {
  dispatch({
    type: SET_CURRENT_PROJECT,
    payload: projectData
  });
};
