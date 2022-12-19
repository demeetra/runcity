import React, { useReducer, useContext } from 'react'
import { Alert, Platform } from 'react-native'
import { EventInfoContext } from './EventInfoContext'
import { EventInfoReducer } from './EventInfoReducer'
import {
  EVENT_INFO_FETCH,
  EVENT_INFO_CLEAR_ERROR,
  EVENT_INFO_SHOW_ERROR,
  EVENT_INFO_SHOW_LOADER,
  EVENT_INFO_HIDE_LOADER,
} from '../types'
import { ScreenContext } from '../screen/screenContext'

const ip_address = Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/'

export const EventInfoState = ({ children }) => {
  const initialState = {
    eventInfo: {},
    loading: false,
    error: null,
  }

  const { changeScreen } = useContext(ScreenContext)
  const [state, dispatch] = useReducer(EventInfoReducer, initialState)

  const clearError = () => dispatch({ type: EVENT_INFO_CLEAR_ERROR })
  const showError = error => dispatch({ type: EVENT_INFO_SHOW_ERROR, error })
  const showLoader = () => dispatch({ type: EVENT_INFO_SHOW_LOADER })
  const hideLoader = () => dispatch({ type: EVENT_INFO_HIDE_LOADER })

  const fetchEventInfo = async (eventId) => {
    showLoader()
    clearError()
    const apiUrl = ip_address + 'api/v1/games'
    try {
      const response = await fetch(apiUrl, {method: 'GET', headers: { 'Content-Type': 'application/json' }})
      const json = await response.json()
      const eventInfo = json.data.filter((item) => (item.id == eventId) )[0]
      console.log('fetchEventInfo', eventInfo.id)
      dispatch( { type: EVENT_INFO_FETCH, eventInfo } )
    } catch (exc) {
        showError('Something went wrong...')
        console.log(exc)
    } finally {
      hideLoader()
    }
  }

  return (
    <EventInfoContext.Provider
      value={{
        eventInfo: state.eventInfo,
        loading: state.loading,
        error: state.error,
        fetchEventInfo,
      }}
    >
      {children}
    </EventInfoContext.Provider>
  )
}
