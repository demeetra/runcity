import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {A_Photo} from './A_Photo';

export const M_ProfileName = ({user}) => {
  return (
    <View style={styles.row}>
      <View style={styles.photo}>
        <A_Photo />
      </View>
      <View style={styles.separator} />
      <View style={styles.card}>
        <Text style={styles.text}>{user.first_name}</Text>
        <Text style={styles.text}>{user.last_name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  photo: {
    width: '50%',
  },
  separator: {
    width: '5%',
  },
  card: {
    flexDirection: 'column',
    width: '45%',
    backgroundColor: '#FCFCFC',
    overflow: 'hidden',
    borderRadius: 8,
  },
  text: {
    fontSize: 20,
    fontFamily: 'Rubik',
    color: '#414141',
    margin: 16,
  },
});
