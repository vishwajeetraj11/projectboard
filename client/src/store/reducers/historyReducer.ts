import { GET_PROJECT_HISTORY_CLEAR, GET_TASK_HISTORY_SUCCESS, GET_TASK_HISTORY_REQUEST, GET_TASK_HISTORY_FAIL, GET_TASK_HISTORY_CLEAR, GET_PROJECT_HISTORY_SUCCESS, GET_PROJECT_HISTORY_REQUEST, GET_PROJECT_HISTORY_FAIL } from 'store/contants/historyConstants';
import { User_Populated_History } from '../../shared/types';

const INITIAL_STATE_PROJECT_HISTORY = {
  loading: false,
  error: false,
  success: false,
  history: [] as Array<User_Populated_History>
};

const INITIAL_STATE_TASK_HISTORY = {
  loading: false,
  error: false,
  success: false,
  history: [] as Array<User_Populated_History>
};

export const projectHistoryReducer = (state = INITIAL_STATE_PROJECT_HISTORY, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT_HISTORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_PROJECT_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        history: payload
      };
    case GET_PROJECT_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload
      };
    case GET_PROJECT_HISTORY_CLEAR:
      return INITIAL_STATE_PROJECT_HISTORY;
    default:
      break;
  }
  return state;
};

export const taskHistoryReducer = (state = INITIAL_STATE_TASK_HISTORY, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TASK_HISTORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_TASK_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        history: payload
      };
    case GET_TASK_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: payload
      };
    case GET_TASK_HISTORY_CLEAR:
      return INITIAL_STATE_TASK_HISTORY;
    default:
      break;
  }
  return state;
};
