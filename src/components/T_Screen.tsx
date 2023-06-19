import React from 'react';
import {StyleSheet, View} from 'react-native';
import {THEME} from '../theme';
import {O_NoData} from '../components/O_NoData.tsx';

export const T_Screen = props => {
  const children = props.hasData === false ? <O_NoData /> : props.children;
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: THEME.PADDING_VERTICAL,
    fontFamily: 'Rubik',
    backgroundColor: '#F1F1EF', // TODO: fix height of parrent containers
  },
});
