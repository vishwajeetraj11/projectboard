import { Task } from 'shared/types';
// import { Task } from "../../shared/types";
import { CHANGE_STATUS_OF_TASK_SUCCESS, GET_TASKS_FAIL, GET_TASKS_REQUEST, GET_TASKS_SUCCESS } from "../contants/taskConstants";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,
  tasks: {
    backlog: [] as Array<Task>,
    todo: [] as Array<Task>,
    in_progress: [] as Array<Task>,
    done: [] as Array<Task>,
    cancelled: [] as Array<Task>,
  }
};

export const taskListReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        tasks: payload
      };
    case GET_TASKS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload
      };
    case CHANGE_STATUS_OF_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload
      };
    default:
      break;
  }
  return state;
};
