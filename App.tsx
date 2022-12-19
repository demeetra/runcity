import React, { type PropsWithChildren } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { ActualEventsState } from './src/context/actual_events/ActualEventsState';
import { ScreenState } from './src/context/screen/ScreenState';
import { MainLayout } from './src/MainLayout';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#222' : '#F3F3F3',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundStyle.backgroundColor} />
      <ScreenState>
          <MainLayout />
      </ScreenState>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
});

export default App;
