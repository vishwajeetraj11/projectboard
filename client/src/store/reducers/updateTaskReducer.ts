import { Task } from 'shared/types';
// import { Task } from "../../shared/types";
import { UPDATE_TASK_MICRO_PROPS_CLEAR, UPDATE_TASK_MICRO_PROPS_REQUEST, UPDATE_TASK_MICRO_PROPS_SUCCESS, UPDATE_TASK_MICRO_PROPS_FAIL } from "../contants/taskConstants";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  task: {} as Task
};

export const updateTaskReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_TASK_MICRO_PROPS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_TASK_MICRO_PROPS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        tasks: payload
      };
    case UPDATE_TASK_MICRO_PROPS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload
      };
    case UPDATE_TASK_MICRO_PROPS_CLEAR:
      return INITIAL_STATE;
    default:
      break;
  }
  return state;
};
