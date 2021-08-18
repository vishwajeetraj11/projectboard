import { Task } from 'shared/types';
import { GET_TASK_DETAIL_SUCCESS, GET_TASK_DETAIL_FAIL, GET_TASK_DETAIL_REQUEST, GET_TASK_DETAIL_CLEAR } from "../contants/taskConstants";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  task: {} as Task
};

export const taskDetailReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASK_DETAIL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_TASK_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        task: payload
      };
    case GET_TASK_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload
      };
    case GET_TASK_DETAIL_CLEAR:
      return {
        ...INITIAL_STATE
      };
    default:
      break;
  }
  return state;
};
