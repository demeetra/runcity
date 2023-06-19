import React from 'react';
import {StyleSheet, Image} from 'react-native';

export const M_CoverCard = ({}) => {
  // TODO: correct image uri as argument
  return (
    <Image style={styles.image} source={require('../../assets/test.png')} />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    paddingBottom: '50%',
    resizeMode: 'contain',
    backgroundColor: 'black', // debug
  },
});
