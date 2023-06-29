import React from 'react';
import {StyleSheet, View} from 'react-native';

export const A_BackgroundTableRow = props => {
  return <View style={styles.container}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#FCFCFC',
    justifyContent: 'center',
  },
});
