import { USER_LOGIN, USER_LOGOUT } from '../constants/constants';

const INITIAL_STATE = {
  userInfo: {}
}

export default function user(state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        userInfo: {
          ...action.payload
        }
      }
    }
    case USER_LOGOUT: {
      return {
        ...INITIAL_STATE
      }
    }
    default:
      return state
  }
}

export const getUserinfo = (store: any) => store.user.userinfo;