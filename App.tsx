import React from 'react';
import {Provider} from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {MainLayout} from './src/MainLayout';
import {store, persistor} from './src/store/store';
import {BAR_DARK, BAR_LIGHT} from './src/theme';

const App = () => {
  let barStyle = 'light-content';
  let backgroundColor = BAR_LIGHT;
  if (useColorScheme() === 'dark') {
    barStyle = 'dark-content';
    backgroundColor = BAR_DARK;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
          <MainLayout />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    'min-height': '100vh',
  },
});

export default App;
