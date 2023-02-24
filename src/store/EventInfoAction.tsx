import React, {useReducer, useContext} from 'react';
import {Alert, Platform} from 'react-native';
import {
  EVENT_INFO_FETCH,
  EVENT_INFO_CLEAR_ERROR,
  EVENT_INFO_SHOW_ERROR,
  EVENT_INFO_SHOW_LOADER,
  EVENT_INFO_HIDE_LOADER,
} from './constants';

//const ip_address = Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/';
const ip_address = 'https://www.public.runcitytest.org';

export const fetchEventInfo = eventId => {
  return async dispatch => {
    const clearError = () => dispatch({type: EVENT_INFO_CLEAR_ERROR});
    const showError = error => dispatch({type: EVENT_INFO_SHOW_ERROR, error});
    const showLoader = () => dispatch({type: EVENT_INFO_SHOW_LOADER});
    const hideLoader = () => dispatch({type: EVENT_INFO_HIDE_LOADER});
    const fetchEventInfo = async () => {
      showLoader();
      clearError();
      const apiUrl = ip_address + '/ru/api_json/?handler=event&id=' + eventId;
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        });
        const json = await response.json();
        if (!json.status) {
          console.log('Bad reply', json);
          showError(json.error);
        } else {
          dispatch({type: EVENT_INFO_FETCH, eventInfo: json.data});
        }
      } catch (exc) {
        showError('Something went wrong...');
        console.log(exc);
      } finally {
        hideLoader();
      }
    };
    return await fetchEventInfo();
  };
};
