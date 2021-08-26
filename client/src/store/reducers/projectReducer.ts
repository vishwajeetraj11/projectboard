import { SET_CURRENT_PROJECT } from 'store/contants/projectConstants';
import { Member } from '../../shared/types';
const INITIAL_STATE = {
  projectData: {} as Member
};
export const projectReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_CURRENT_PROJECT:
      return {
        ...state,
        projectData: payload
      };

    default:
      break;
  }
  return state;
};
