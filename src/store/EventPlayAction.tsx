import React, { useReducer, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import {
  EVENT_PLAY_FETCH_TITLES,
  EVENT_PLAY_FETCH_CHECKPOINT,
  EVENT_PLAY_CLEAR_ERROR,
  EVENT_PLAY_SHOW_ERROR,
  EVENT_PLAY_SHOW_LOADER,
  EVENT_PLAY_HIDE_LOADER,
} from './constants';

const ip_address = 'https://www.public.runcitytest.org';

export const fetchTitlesEventPlay = (eventId) => {
  return async (dispatch, getState) => {
    if (!eventId)
      return;
    const clearError = () => dispatch({ type: EVENT_PLAY_CLEAR_ERROR });
    const showError = error => dispatch({ type: EVENT_PLAY_SHOW_ERROR, error });
    const showLoader = () => dispatch({ type: EVENT_PLAY_SHOW_LOADER });
    const hideLoader = () => dispatch({ type: EVENT_PLAY_HIDE_LOADER });
    const func = async () => {
      showLoader()
      clearError()
      const apiUrl = ip_address + '/ru/api_json/?handler=checkpoints&id=' + eventId;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().userReducer.token,
      };
      try {
        const response = await fetch(apiUrl, {method: 'GET', headers})
        const json = await response.json()
        const titles = Object.keys(json.data).map(key => json.data[key]).sort((l, r) => { return Number(l.sort_order) - Number(r.sort_order); });
        dispatch( { type: EVENT_PLAY_FETCH_TITLES, titles } )
      } catch (exc) {
          showError('Something went wrong...')
          console.log(exc)
      } finally {
        hideLoader()
      }
    };
    return await func();
  };
}

export const fetchCheckpointEventPlay = (checkpointId) => {
  return async (dispatch, getState) => {
    if (!checkpointId)
      return;
    const clearError = () => dispatch({ type: EVENT_PLAY_CLEAR_ERROR });
    const showError = error => dispatch({ type: EVENT_PLAY_SHOW_ERROR, error });
    const showLoader = () => dispatch({ type: EVENT_PLAY_SHOW_LOADER });
    const hideLoader = () => dispatch({ type: EVENT_PLAY_HIDE_LOADER });
    const func = async () => {
      showLoader()
      clearError()
      const apiUrl = ip_address + '/ru/api_json/?handler=checkpoint&cp_id=' + checkpointId;
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getState().userReducer.token,
      };
      try {
        const response = await fetch(apiUrl, {method: 'GET', headers})
        const json = await response.json()
        const update = { [checkpointId]: json.data }
        dispatch( { type: EVENT_PLAY_FETCH_CHECKPOINT, checkpoints: update } )
      } catch (exc) {
          showError('Something went wrong...')
          console.log(exc)
      } finally {
        hideLoader()
      }
    };
    return await func();
  };
}


export const updateCheckpointEventPlay = (checkpointId, params) => {
  return async dispatch => {
    const clearError = () => dispatch({ type: EVENT_PLAY_CLEAR_ERROR });
    const showError = error => dispatch({ type: EVENT_PLAY_SHOW_ERROR, error });
    const showLoader = () => dispatch({ type: EVENT_PLAY_SHOW_LOADER });
    const hideLoader = () => dispatch({ type: EVENT_PLAY_HIDE_LOADER });
    const func = async () => {
      showLoader();
      clearError();
      const apiUrl = ip_address + 'api/v1/checkpoints/' + checkpointId;
      try {
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params)
        });
        const json = await response.json();
        const update = { [checkpointId]: json };
        dispatch( { type: EVENT_PLAY_FETCH_CHECKPOINT, checkpoints: update } );
      } catch (exc) {
          showError('Something went wrong...');
          console.log(exc);
      } finally {
        hideLoader();
      }
    };
    return await func();
  };
}
