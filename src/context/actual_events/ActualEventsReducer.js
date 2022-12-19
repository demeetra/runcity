import {
  ACTUAL_EVENTS_FETCH,
  ACTUAL_EVENTS_CLEAR_ERROR,
  ACTUAL_EVENTS_SHOW_ERROR,
  ACTUAL_EVENTS_SHOW_LOADER,
  ACTUAL_EVENTS_HIDE_LOADER,
} from '../types'

const handlers = {
  [ACTUAL_EVENTS_FETCH]: (state, { actualEvents }) => ({ ...state, actualEvents }),
  [ACTUAL_EVENTS_SHOW_LOADER]: state => ({ ...state, loading: true }),
  [ACTUAL_EVENTS_HIDE_LOADER]: state => ({ ...state, loading: false }),
  [ACTUAL_EVENTS_CLEAR_ERROR]: state => ({ ...state, error: null }),
  [ACTUAL_EVENTS_SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  DEFAULT: state => state
}

export const ActualEventsReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
