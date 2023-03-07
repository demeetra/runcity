import {
  EVENT_PLAY_FETCH_TITLES,
  EVENT_PLAY_FETCH_CHECKPOINT,
} from './constants';

const initialState = {
  titles: {},
  checkpoints: {},
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
    default:
      return state;
  }
};

export default eventPlayReducer;
