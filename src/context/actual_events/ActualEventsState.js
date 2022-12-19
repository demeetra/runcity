import React, { useReducer, useContext } from 'react'
import { Alert, Platform } from 'react-native'
import { ActualEventsContext } from './ActualEventsContext'
import { ActualEventsReducer } from './ActualEventsReducer'
import {
  ACTUAL_EVENTS_FETCH,
  ACTUAL_EVENTS_CLEAR_ERROR,
  ACTUAL_EVENTS_SHOW_ERROR,
  ACTUAL_EVENTS_SHOW_LOADER,
  ACTUAL_EVENTS_HIDE_LOADER,
} from '../types'
import { ScreenContext } from '../screen/screenContext'

const ip_address = Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/'

export const ActualEventsState = ({ children }) => {
  const initialState = {
    actualEvents: [],
    loading: false,
    error: null,
  }

  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(ActualEventsReducer, initialState)

  const clearError = () => dispatch({ type: ACTUAL_EVENTS_CLEAR_ERROR })
  const showError = error => dispatch({ type: ACTUAL_EVENTS_SHOW_ERROR, error })
  const showLoader = () => dispatch({ type: ACTUAL_EVENTS_SHOW_LOADER })
  const hideLoader = () => dispatch({ type: ACTUAL_EVENTS_HIDE_LOADER })

  const fetchActualEvents = async () => {
    showLoader()
    clearError()
    const apiUrl = ip_address + 'api/v1/games'
    try {
      const response = await fetch(apiUrl, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
      const json = await response.json()
      const actualEvents = json.data
      dispatch( { type: ACTUAL_EVENTS_FETCH, actualEvents } )
    } catch (exc) {
        showError('Something went wrong...')
        console.log(exc)
    } finally {
      hideLoader()
    }
  }

  return (
    <ActualEventsContext.Provider
      value={{
        actualEvents: state.actualEvents,
        loading: state.loading,
        error: state.error,
        fetchActualEvents,
      }}
    >
      {children}
    </ActualEventsContext.Provider>
  )
}
