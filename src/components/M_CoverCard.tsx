import React from 'react';
import {StyleSheet, Image, Platform} from 'react-native';

const knownImages = Platform.select({
  web: {
    1: require('../../assets/city_1.svg'),
    2: require('../../assets/city_2.svg'),
    3: require('../../assets/city_3.svg'),
    4: require('../../assets/city_4.svg'),
    5: require('../../assets/city_5.svg'),
    6: require('../../assets/city_6.svg'),
  },
  default: {
    1: require('../../assets/city_1.png'),
    2: require('../../assets/city_2.png'),
    3: require('../../assets/city_3.png'),
    4: require('../../assets/city_4.png'),
    5: require('../../assets/city_5.png'),
    6: require('../../assets/city_6.png'),
  },
});

export const M_CoverCard = ({item}) => {
  // TODO: correct image uri as argument
  // TODO: use external images
  const imgId =
    item.city_id <= 2
      ? item.city_id
      : 3 + ((item.city_id * 19 + 7) % (Object.keys(knownImages).length - 2));
  return <Image style={styles.image} source={knownImages[imgId]} />;
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    paddingBottom: '50%',
    resizeMode: 'contain',
  },
});
