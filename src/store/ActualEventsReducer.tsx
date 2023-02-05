import {
  ACTUAL_EVENTS_FETCH,
  ACTUAL_EVENTS_CLEAR_ERROR,
  ACTUAL_EVENTS_SHOW_ERROR,
  ACTUAL_EVENTS_SHOW_LOADER,
  ACTUAL_EVENTS_HIDE_LOADER,
} from './constants';

const initialState = {
  actualEvents: [],
  loading: false,
  error: null,
};

const actualEventsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTUAL_EVENTS_FETCH:
      return { ...state, actualEvents:action.actualEvents };
    case ACTUAL_EVENTS_SHOW_LOADER:
      return { ...state, loading: true };
    case ACTUAL_EVENTS_HIDE_LOADER:
      return { ...state, loading: false };
    case ACTUAL_EVENTS_CLEAR_ERROR:
      return { ...state, error: null };
    case ACTUAL_EVENTS_SHOW_ERROR:
      return { ...state, error:action.error };
    default:
      return state;
  }
};

export default actualEventsReducer;
