import { createStore, combineReducers } from 'redux';
import screenReducer from './ScreenReducer';

const rootReducer = combineReducers({
  screenReducer,
});

export const store = createStore(rootReducer);
