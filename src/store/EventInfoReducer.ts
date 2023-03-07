import {EVENT_INFO_FETCH} from './constants';

const initialState = {
  eventInfo: {},
};

const eventInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_INFO_FETCH:
      return {...state, eventInfo: action.eventInfo};
    default:
      return state;
  }
};

export default eventInfoReducer;
