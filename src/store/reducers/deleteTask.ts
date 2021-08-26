import { DELETE_TASK_CLEAR, DELETE_TASK_FAIL, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS } from "../contants/taskConstants";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
};

export const deleteTaskReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case DELETE_TASK_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload
      };
    case DELETE_TASK_CLEAR:
      return INITIAL_STATE;
    default:
      break;
  }
  return state;
};
