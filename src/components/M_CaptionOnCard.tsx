import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const M_CaptionOnCard = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textPlace]}>
        {item.place.toUpperCase()}
      </Text>
      <Text style={[styles.text, styles.textName]}>
        {item.name.toUpperCase()}
      </Text>
      <Text style={[styles.text, styles.textDate]}>
        {new Date(Number(item.date_start * 1000)).toLocaleDateString('ru-ru')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Rubik',
  },
  textPlace: {
    color: '#414141',
    fontSize: 36,
    fontWeight: 'bold',
  },
  textName: {
    color: '#414141',
    fontFamily: 'Rubik',
  },
  textDate: {
    fontFamily: 'Rubik',
    color: '#414141',
  },
});
