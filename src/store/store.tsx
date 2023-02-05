import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import actualEventsReducer from './ActualEventsReducer';
import eventInfoReducer from './EventInfoReducer';
import eventPlayReducer from './EventPlayReducer';
import screenReducer from './ScreenReducer';

const rootReducer = combineReducers({
  actualEventsReducer,
  eventInfoReducer,
  eventPlayReducer,
  screenReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
