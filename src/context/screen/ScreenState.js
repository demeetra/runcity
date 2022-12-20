import React, { useReducer } from 'react'
import { ScreenContext } from './screenContext'
import { screenReducer } from './screenReducer'
import { CHANGE_SCREEN } from '../types'

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, {eventId: null, eventPlay: null, inProfile: null})

  const changeScreen = payload => dispatch({ type: CHANGE_SCREEN, payload })

  return (
    <ScreenContext.Provider
      value={{
        changeScreen,
        eventId: state.eventId,
        eventPlay: state.eventPlay,
        inProfile: state.inProfile,
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}
