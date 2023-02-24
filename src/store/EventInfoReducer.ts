import {
  EVENT_INFO_FETCH,
  EVENT_INFO_CLEAR_ERROR,
  EVENT_INFO_SHOW_ERROR,
  EVENT_INFO_SHOW_LOADER,
  EVENT_INFO_HIDE_LOADER,
} from './constants';

const initialState = {
  eventInfo: {},
  loading: false,
  error: null,
};

const eventInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_INFO_FETCH:
      return {...state, eventInfo: action.eventInfo};
    case EVENT_INFO_SHOW_LOADER:
      return {...state, loading: true};
    case EVENT_INFO_HIDE_LOADER:
      return {...state, loading: false};
    case EVENT_INFO_CLEAR_ERROR:
      return {...state, error: null};
    case EVENT_INFO_SHOW_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
};

export default eventInfoReducer;
