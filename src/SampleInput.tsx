import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const SampleInput = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Name:</Text>
      <TextInput style={styles.textInput} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 15,
  },
  textInput: {
    borderBottomColor: 'blue',
    width: '90%',
    height: 40,
    borderBottomWidth: 1,
  },
});

export default SampleInput;
