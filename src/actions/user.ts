import { createAction } from '../utils/redux';
import { USER_LOGIN, USER_LOGOUT } from '../constants/constants';

export const dispatchLogin = (payload: any) => createAction({
  type: USER_LOGIN,
  payload
});

export const dispatchLogout = (payload: any) => createAction({
  type: USER_LOGOUT,
  payload
});