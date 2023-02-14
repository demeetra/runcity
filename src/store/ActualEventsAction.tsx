import React, { useReducer, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import {
  ACTUAL_EVENTS_FETCH,
  ACTUAL_EVENTS_CLEAR_ERROR,
  ACTUAL_EVENTS_SHOW_ERROR,
  ACTUAL_EVENTS_SHOW_LOADER,
  ACTUAL_EVENTS_HIDE_LOADER,
} from './constants';

//const ip_address = Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/';
const ip_address = 'https://www.public.runcitytest.org';

export const fetchActualEvents = () => {
  return async dispatch => {
    const clearError = () => dispatch({ type: ACTUAL_EVENTS_CLEAR_ERROR });
    const showError = error => dispatch({ type: ACTUAL_EVENTS_SHOW_ERROR, error });
    const showLoader = () => dispatch({ type: ACTUAL_EVENTS_SHOW_LOADER });
    const hideLoader = () => dispatch({ type: ACTUAL_EVENTS_HIDE_LOADER });
    const fetchActualEvents = async () => {
      showLoader()
      clearError()
      const apiUrl = ip_address + '/ru/api_json/?handler=events'
      try {
        const response = await fetch(apiUrl, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
        const json = await response.json()
        if (!json.status) {
          console.log('Bad reply', json);
          dispatch({ type: ACTUAL_EVENTS_SHOW_ERROR, error: json.error});
        } else {
          dispatch( { type: ACTUAL_EVENTS_FETCH, actualEvents: Object.keys(json.data).map(key => json.data[key]) } )
        }
      } catch (exc) {
          showError('Something went wrong...')
          console.log(exc)
      } finally {
        hideLoader()
      }
    };
    return await fetchActualEvents();
  };
};
