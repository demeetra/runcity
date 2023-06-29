import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {A_BackgroundTableRow} from './A_BackgroundTableRow';

export const M_EventRow = ({left, right}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <A_BackgroundTableRow>
        <View style={styles.row}>
          <Text style={[styles.text, styles.left]}>{left}</Text>
          <View style={styles.separator} />
          <Text style={[styles.text, styles.right]}>{right}</Text>
        </View>
      </A_BackgroundTableRow>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 40,
    height: 40,
  },
  separator: {
    width: 16,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Rubik',
    color: '#414141',
    margin: 10,
  },
  left: {},
  right: {
    color: '#007f68',
  },
});
