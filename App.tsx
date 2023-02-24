import React from 'react';
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
  const styles = useColorScheme() === 'dark' ? stylesDark : stylesLight;
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.backgroundStyle}>
        <StatusBar
          barStyle={styles.barStyle}
          backgroundColor={styles.backgroundStyle.backgroundColor}
        />
        <MainLayout />
      </SafeAreaView>
    </Provider>
  );
};

const stylesCommon = {
  backgroundStyle: {
    flex: 1,
  },
};

const stylesLight = StyleSheet.create({
  barStyle: 'light-content',
  backgroundStyle: {
    ...stylesCommon.backgroundStyle,
    backgroundColor: '#F3F3F3',
  },
});

const stylesDark = StyleSheet.create({
  barStyle: 'dark-content',
  backgroundStyle: {
    ...stylesCommon.backgroundStyle,
    backgroundColor: '#222',
  },
});

export default App;
