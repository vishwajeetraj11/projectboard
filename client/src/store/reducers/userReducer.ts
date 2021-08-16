import { SET_USER_PROFILE } from 'store/contants/userConstants';
import { User } from '../../shared/types';
const INITIAL_STATE = {
  user: {} as User
};
export const userProfileReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        user: payload
      };

    default:
      break;
  }
  return state;
};
