import {
  USER_LOGOUT,
  USER_SIGNIN,
  USER_CLEAR_ERROR,
  USER_SHOW_ERROR,
} from './constants';
import {resetScreen} from './ScreenAction';

export const userSignIn = (email, password) => {
  // TODO: use common api
  const apiUrl = 'https://www.public.runcitytest.org/ru/people/login_json/';
  const body = new URLSearchParams({
    email,
    pass: password,
    action: 'login',
  }).toString();
  const headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  return async dispatch => {
    dispatch({type: USER_CLEAR_ERROR});
    try {
      const json = await (
        await fetch(apiUrl, {method: 'POST', headers, body})
      ).json();
      if (!json.status) {
        console.log('Bad reply', json);
        dispatch({type: USER_SHOW_ERROR, error: json.error});
      } else {
        dispatch({
          type: USER_SIGNIN,
          update: {user: json.data.user, token: json.data.token},
        });
      }
    } catch (exc) {
      console.log(exc);
      dispatch({type: USER_SHOW_ERROR, error: exc});
    }
  };
};

export const userLogOut = () => {
  return async dispatch => {
    dispatch({type: USER_LOGOUT});
    dispatch(resetScreen());
  };
};
