import {
  EVENT_INFO_FETCH,
  EVENT_INFO_CLEAR_ERROR,
  EVENT_INFO_SHOW_ERROR,
  EVENT_INFO_SHOW_LOADER,
  EVENT_INFO_HIDE_LOADER,
} from '../types'

const handlers = {
  [EVENT_INFO_FETCH]: (state, { eventInfo }) => ({ ...state, eventInfo }),
  [EVENT_INFO_SHOW_LOADER]: state => ({ ...state, loading: true }),
  [EVENT_INFO_HIDE_LOADER]: state => ({ ...state, loading: false }),
  [EVENT_INFO_CLEAR_ERROR]: state => ({ ...state, error: null }),
  [EVENT_INFO_SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  DEFAULT: state => state
}

export const EventInfoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
