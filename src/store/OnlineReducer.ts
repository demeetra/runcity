import {ONLINE_FETCH} from './constants';

const initialState = {};

const onlineReducer = (state = initialState, action) => {
  switch (action.type) {
    case ONLINE_FETCH:
      return action.data;
    default:
      return state;
  }
};

export default onlineReducer;
