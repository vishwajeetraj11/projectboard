import { GET_MEMBERS_FAIL, GET_MEMBERS_REQUEST, GET_MEMBERS_SUCCESS } from 'store/contants/memberConstants';
import { Member } from '../../shared/types';

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  members: [] as Array<Member>
};

export const memberListReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_MEMBERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_MEMBERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        members: payload
      };
    case GET_MEMBERS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload
      };
    default:
      break;
  }
  return state;
};
