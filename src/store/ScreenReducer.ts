import {SCREEN_CHANGE, SCREEN_RESET} from './constants';

const initialState = {
  eventId: null,
  eventPlay: null,
  inProfile: null,
  checkpointId: null,
};

const screenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SCREEN_CHANGE:
      return {...state, ...action.payload};
    case SCREEN_RESET:
      return {...initialState};
    default:
      return state;
  }
};

export default screenReducer;
