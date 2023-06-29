import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {A_BackgroundTableRow} from './A_BackgroundTableRow';

export const M_ProfileRow = ({text, image}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <A_BackgroundTableRow>
        <View style={styles.row}>
          <Image style={styles.image} source={image} />
          <View style={styles.separator} />
          <Text style={styles.text}>{text}</Text>
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
  },
});
