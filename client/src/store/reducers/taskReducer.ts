import { Status } from "../../shared/constants";
// import { Task } from "../../shared/types";
import { GET_TASKS_FAIL, GET_TASKS_SUCCESS, GET_TASKS_REQUEST } from "../contants/taskConstants";

const INITIAL_STATE = {
  loading: false,
  error: false,
  success: false,

  // tasks:{backlog: [] as Array<Task>,
  //   todo: [] as Array<Task>,
  //   inProgress: [] as Array<Task>,
  //   done: [] as Array<Task>,
  //   canceled: [] as Array<Task>,} 
};

const issueReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS_REQUEST:
      return {
        loading: true
        // backlog: data[Status.BACKLOG] || [],
        // todo: data[Status.TODO] || [],
        // inProgress: data[Status.IN_PROGRESS] || [],
        // done: data[Status.DONE] || [],
        // canceled: data[Status.CANCELED] || []
      };
    default:
      break;
  }
  return state;
};
export default issueReducer;
