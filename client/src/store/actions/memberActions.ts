import axios from 'axios';
import { baseURL, endpoints } from 'shared/urls';
import { GET_MEMBERS_FAIL, GET_MEMBERS_REQUEST, GET_MEMBERS_SUCCESS } from 'store/contants/memberConstants';
import { AppDispatch } from 'store/store';

type TgetAllMembers = (token: string, projectId: string) => void;

export const getAllMembers: TgetAllMembers = (token, projectId) => async (dispatch: AppDispatch) => {
  try {
    dispatch({
      type: GET_MEMBERS_REQUEST,
    });
    const { data } = await axios({
      url: `${baseURL}${endpoints.projects}/${projectId}${endpoints.members}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: GET_MEMBERS_SUCCESS,
      payload: data.members
    });
  } catch (e) {
    dispatch({
      type: GET_MEMBERS_FAIL,
      payload: e?.response?.data?.message
    });
  }
};
