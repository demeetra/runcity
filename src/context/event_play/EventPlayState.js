import React, { useReducer, useContext } from 'react'
import { Alert, Platform } from 'react-native'
import { EventPlayContext } from './EventPlayContext'
import { EventPlayReducer } from './EventPlayReducer'
import {
  EVENT_PLAY_FETCH_TITLES,
  EVENT_PLAY_FETCH_CHECKPOINT,
  EVENT_PLAY_CLEAR_ERROR,
  EVENT_PLAY_SHOW_ERROR,
  EVENT_PLAY_SHOW_LOADER,
  EVENT_PLAY_HIDE_LOADER,
} from '../types'
import { ScreenContext } from '../screen/screenContext'

const ip_address = Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/'

export const EventPlayState = ({ children }) => {
  const initialState = {
    titles: {},
    checkpoints: {},
    loading: false,
    error: null,
  }

  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(EventPlayReducer, initialState)

  const clearError = () => dispatch({ type: EVENT_PLAY_CLEAR_ERROR })
  const showError = error => dispatch({ type: EVENT_PLAY_SHOW_ERROR, error })
  const showLoader = () => dispatch({ type: EVENT_PLAY_SHOW_LOADER })
  const hideLoader = () => dispatch({ type: EVENT_PLAY_HIDE_LOADER })

  const fetchTitlesEventPlay = async (eventId) => {
    if (!eventId)
      return;
    showLoader()
    clearError()
    const apiUrl = ip_address + 'api/v1/checkpoints?event_id=' + eventId;
    try {
      const response = await fetch(apiUrl, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
      const json = await response.json()
      dispatch( { type: EVENT_PLAY_FETCH_TITLES, titles: json } )
    } catch (exc) {
        showError('Something went wrong...')
        console.log(exc)
    } finally {
      hideLoader()
    }
  };

  const fetchCheckpointEventPlay = async (checkpointId) => {
    if (!checkpointId)
      return;
    showLoader()
    clearError()
    const apiUrl = ip_address + 'api/v1/checkpoints/' + checkpointId;
    try {
      const response = await fetch(apiUrl, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
      const json = await response.json()
      const update = { [checkpointId]: json }
      dispatch( { type: EVENT_PLAY_FETCH_CHECKPOINT, checkpoints: update } )
    } catch (exc) {
        showError('Something went wrong...')
        console.log(exc)
    } finally {
      hideLoader()
    }
  };

  const updateCheckpointEventPlay = async (checkpointId, params) => {
    showLoader()
    clearError()
    const apiUrl = ip_address + 'api/v1/checkpoints/' + checkpointId;
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })
      const json = await response.json()
      const update = { [checkpointId]: json }
      dispatch( { type: EVENT_PLAY_FETCH_CHECKPOINT, checkpoints: update } )
    } catch (exc) {
        showError('Something went wrong...')
        console.log(exc)
    } finally {
      hideLoader()
    }
  }

  return (
    <EventPlayContext.Provider
      value={{
        titles: state.titles,
        checkpoints: state.checkpoints,
        loading: state.loading,
        error: state.error,
        fetchTitlesEventPlay,
        fetchCheckpointEventPlay,
        updateCheckpointEventPlay,
      }}
    >
      {children}
    </EventPlayContext.Provider>
  )
}
