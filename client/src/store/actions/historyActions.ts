import { GET_PROJECT_HISTORY_FAIL, GET_PROJECT_HISTORY_REQUEST, GET_PROJECT_HISTORY_SUCCESS, GET_TASK_HISTORY_FAIL, GET_TASK_HISTORY_REQUEST, GET_TASK_HISTORY_SUCCESS } from '../contants/historyConstants';

import axios from 'axios';
import { baseURL, endpoints } from 'shared/urls';
import { AppDispatch } from 'store/store';
// import socket from 'shared/utils/socket';
type TgetProjectHistory = (token: string, projectId: string) => void;
type TgetTaskHistory = (token: string, projectId: string, taskId: string) => void;

export const getProjectHistory: TgetProjectHistory = (token, projectId) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: GET_PROJECT_HISTORY_REQUEST });

    const { data } = await axios({
      url: `${baseURL}${endpoints.history}${endpoints.projects}/${projectId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_PROJECT_HISTORY_SUCCESS, payload: data.history });

  } catch (e) {
    dispatch({ type: GET_PROJECT_HISTORY_FAIL, payload: e?.response?.data?.message });
  }
};

export const getTaskHistory: TgetTaskHistory = (token, projectId, taskId) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: GET_TASK_HISTORY_REQUEST });
    const { data } = await axios({
      url: `${baseURL}${endpoints.history}${endpoints.projects}/${projectId}${endpoints.tasks}/${taskId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: GET_TASK_HISTORY_SUCCESS, payload: data.history });

  } catch (e) {
    console.log(e?.response?.data?.message);
    dispatch({ type: GET_TASK_HISTORY_FAIL, payload: e?.response?.data?.message });
  }
};
