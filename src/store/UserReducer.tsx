import {
  USER_LOGOUT,
  USER_SIGNIN,
  USER_CLEAR_ERROR,
  USER_SHOW_ERROR,
} from './constants';

const initialState = {
  user: null,
  token: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOGOUT:
      return { ...initialState };
    case USER_SIGNIN:
      return { ...state, ...action.update };
    case USER_CLEAR_ERROR:
      return { ...state, error: null };
    case USER_SHOW_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default userReducer;
