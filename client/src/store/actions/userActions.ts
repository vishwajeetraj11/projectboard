import { User } from 'shared/types';
import { SET_USER_PROFILE } from 'store/contants/userConstants';
import { AppDispatch } from 'store/store';

type TsetUserProfile = (user: User) => void;
export const setUserProfile: TsetUserProfile = (user) => async (dispatch: AppDispatch) => {
  dispatch({
    type: SET_USER_PROFILE,
    payload: user
  });
};
