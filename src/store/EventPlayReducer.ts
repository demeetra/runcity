import {
  EVENT_PLAY_FETCH_TITLES,
  EVENT_PLAY_FETCH_CHECKPOINT,
  EVENT_PLAY_CLEAR_ERROR,
  EVENT_PLAY_SHOW_ERROR,
  EVENT_PLAY_SHOW_LOADER,
  EVENT_PLAY_HIDE_LOADER,
} from './constants';

const initialState = {
  titles: {},
  checkpoints: {},
  loading: false,
  error: null,
};

const eventPlayReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_PLAY_FETCH_TITLES:
      return {...state, titles: action.titles};
    case EVENT_PLAY_FETCH_CHECKPOINT:
      return {
        ...state,
        checkpoints: {...state.checkpoints, ...action.checkpoints},
      };
    case EVENT_PLAY_SHOW_LOADER:
      return {...state, loading: true};
    case EVENT_PLAY_HIDE_LOADER:
      return {...state, loading: false};
    case EVENT_PLAY_CLEAR_ERROR:
      return {...state, error: null};
    case EVENT_PLAY_SHOW_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default eventPlayReducer;
