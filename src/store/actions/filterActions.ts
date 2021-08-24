import { ADD_FILTER_ASSIGNEE, ADD_FILTER_STATUS, ADD_FILTER_PRIORITY, ADD_FILTER_LABEL } from 'store/contants/filterConstants';
import { AppDispatch, RootState } from 'store/store';

export const addStatusFilter = (status: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  // const { filters } = getState();
  // const newFilters = { ...filters };
  // newFilters.status = status;
  dispatch({
    type: ADD_FILTER_STATUS,
    payload: status
  });
};

export const addPriorityFilter = (priority: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  // const { filters } = getState();
  // const newFilters = { ...filters };
  // newFilters.priority = priority;
  dispatch({
    type: ADD_FILTER_PRIORITY,
    payload: priority
  });
};

export const addLabelFilter = (label: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  // const { filters } = getState();
  // const newFilters = { ...filters };
  // newFilters.label = label;
  dispatch({
    type: ADD_FILTER_LABEL,
    payload: label
  });
};

export const addAssigneeFilter = (assignee: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  // const { filters } = getState();
  // const newFilters = { ...filters };
  // newFilters.assignee = assignee;
  dispatch({
    type: ADD_FILTER_ASSIGNEE,
    payload: assignee
  });
};
