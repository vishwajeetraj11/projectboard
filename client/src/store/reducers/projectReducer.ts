import { SET_CURRENT_PROJECT } from 'store/contants/projectConstants';

const INITIAL_STATE = {
  projectData: {}
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
