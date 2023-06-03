import React from 'react';
import {AppRegistry} from 'react-native';
import {createRoot} from 'react-dom/client';
import App from './App';
import '@fontsource/rubik';

if (module.hot) {
  module.hot.accept();
}
AppRegistry.registerComponent('React Native Web', () => App);
createRoot(document.getElementById('root')).render(<App />);
/*
AppRegistry.runApplication('React Native Web', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
*/
