import {ACTUAL_EVENTS_FETCH} from './constants';

const initialState = {
  actualEvents: [],
};

const actualEventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTUAL_EVENTS_FETCH:
      return {...state, actualEvents: action.actualEvents};
    default:
      return state;
  }
};

export default actualEventsReducer;
