import { ADD_FILTER, CLEAR_FILTER, REMOVE_FILTER } from 'store/contants/filterConstants';

const INITIAL_STATE = {
  filters: [] as Array<string>
};

export const filtersReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_FILTER:
      return {
        ...state,
        filters: payload
      };
    case REMOVE_FILTER:
      return {
        ...state,
        filters: payload
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filters: []
      };
    default:
      break;
  }
  return state;
};
