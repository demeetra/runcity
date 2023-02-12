import React, { useReducer, useContext } from 'react';
import {
  USER_LOGOUT,
  USER_SIGNIN,
  USER_CLEAR_ERROR,
  USER_SHOW_ERROR,
} from './constants';
import {changeScreen} from './ScreenAction';

const ip_address = 'https://www.public.runcitytest.org';

export const userSignIn = (email, password) => {
  const apiUrl = ip_address + '/ru/people/login_json/'
  const body = new URLSearchParams({
    email,
    pass: password,
    action: 'login',
  }).toString();
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  return async dispatch => {
    dispatch({ type: USER_CLEAR_ERROR });
    try {
      const json = await (await fetch(apiUrl, {method: 'POST', headers, body})).json();
      if (!json.ok) {
        console.log('Bad reply', json);
        dispatch({ type: USER_SHOW_ERROR, error: json.reason});
      } else {
        dispatch( { type: USER_SIGNIN, data: json.data } );
        dispatch(changeScreen({isSignedIn: true}));
      }
    } catch (exc) {
        console.log(exc);
        dispatch({ type: USER_SHOW_ERROR, error: exc});
    }
  }
};

export const userLogOut = () => {
  return async dispatch => {
    dispatch({type: USER_LOGOUT});
    dispatch(changeScreen({isSignedIn: false}));
  };
};