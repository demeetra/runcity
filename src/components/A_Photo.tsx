import React from 'react';
import {Image, StyleSheet} from 'react-native';

const noPhoto = require('../../assets/photo_anonymous.jpg');

export const A_Photo = ({uri}) => {
  // TODO: use external images
  return <Image style={styles.image} source={uri || noPhoto} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    paddingBottom: '50%',
    resizeMode: 'contain',
  },
});
