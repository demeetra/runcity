import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {THEME} from '../../theme';

export const AppLoader = () => (
  <View style={styles.appload}>
    <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
  </View>
);

const styles = StyleSheet.create({
  appload: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
