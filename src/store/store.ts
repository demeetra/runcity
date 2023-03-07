import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

import actualEventsReducer from './ActualEventsReducer';
import eventInfoReducer from './EventInfoReducer';
import eventPlayReducer from './EventPlayReducer';
import screenReducer from './ScreenReducer';
import {runcityApiReducer} from './runcityApi';
import userReducer from './UserReducer';

const userPersistConfig = {key: 'user', storage: AsyncStorage};

const rootReducer = combineReducers({
  actualEventsReducer,
  eventInfoReducer,
  eventPlayReducer,
  screenReducer,
  runcityApiReducer,
  userReducer: persistReducer(userPersistConfig, userReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
