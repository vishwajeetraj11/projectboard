import { ADD_FILTER } from 'store/contants/filterConstants';
import { AppDispatch, RootState } from 'store/store';

export const addFilterItem = (filter: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { filters } = getState();
  let newFilters = [...filters.filters];
  newFilters = newFilters.concat(filter);
  dispatch({
    type: ADD_FILTER,
    payload: newFilters
  });
};

export const removeFilterItem = (filter: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { filters } = getState();
  let newFilters = [...filters.filters];
  newFilters = newFilters.filter((filt) => filt !== filter);
  dispatch({
    type: ADD_FILTER,
    payload: newFilters
  });
};
