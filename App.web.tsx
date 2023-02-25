import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {MainLayout} from './src/MainLayout';
import {store, persistor} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView>
          <StatusBar barStyle="dark-content" />
          <MainLayout />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
