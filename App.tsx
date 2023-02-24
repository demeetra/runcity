import React, {type PropsWithChildren} from 'react';
import {Provider} from 'react-redux';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {MainLayout} from './src/MainLayout';
import {store} from './src/store/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
    flex: 1,
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={barStyle}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <MainLayout />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
