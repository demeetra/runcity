import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const O_NoData = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/no-items.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: '25%',
    paddingBottom: '25%',
    resizeMode: 'contain',
  },
});
