import { ADD_FILTER_ASSIGNEE, ADD_FILTER_LABEL, ADD_FILTER_PRIORITY, ADD_FILTER_STATUS, CLEAR_ALL_FILTER } from 'store/contants/filterConstants';

const INITIAL_STATE = {
  priority: '',
  status: '',
  label: '',
  assignee: ''
};

export const filtersReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_FILTER_STATUS:
      return {
        ...state,
        status: payload,
      };
    case ADD_FILTER_PRIORITY:
      return {
        ...state,
        priority: payload,
      };
    case ADD_FILTER_LABEL:
      return {
        ...state,
        label: payload,
      };
    case ADD_FILTER_ASSIGNEE:
      return {
        ...state,
        assignee: payload,
      };
    case CLEAR_ALL_FILTER:
      return {
        ...INITIAL_STATE,
      };
    default:
      break;
  }
  return state;
};
