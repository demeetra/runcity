import { SCREEN_CHANGE } from './constants';

const initialState = {
  isSignedIn: false,
  eventId: null,
  eventPlay: null,
  inProfile: null,
  checkpointId: null,
};

const screenReducer = (state = initialState, action) => {
  switch(action.type) {
    case SCREEN_CHANGE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default screenReducer;
