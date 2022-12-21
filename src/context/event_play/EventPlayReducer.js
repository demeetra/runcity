import {
  EVENT_PLAY_FETCH_TITLES,
  EVENT_PLAY_FETCH_CHECKPOINT,
  EVENT_PLAY_CLEAR_ERROR,
  EVENT_PLAY_SHOW_ERROR,
  EVENT_PLAY_SHOW_LOADER,
  EVENT_PLAY_HIDE_LOADER,
} from '../types'

const handlers = {
  [EVENT_PLAY_FETCH_TITLES]: (state, { titles }) => ({ ...state, titles }),
  [EVENT_PLAY_FETCH_CHECKPOINT]: (state, { checkpoints }) => ({ ...state, checkpoints: {...state.checkpoints, ...checkpoints} }),
  [EVENT_PLAY_SHOW_LOADER]: state => ({ ...state, loading: true }),
  [EVENT_PLAY_HIDE_LOADER]: state => ({ ...state, loading: false }),
  [EVENT_PLAY_CLEAR_ERROR]: state => ({ ...state, error: null }),
  [EVENT_PLAY_SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  DEFAULT: state => state
}

export const EventPlayReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
