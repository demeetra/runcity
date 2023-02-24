import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {MainLayout} from './src/MainLayout';
import {store} from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <MainLayout />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
