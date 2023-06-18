import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {O_Card} from '../components/O_Card';
import {O_NoData} from '../components/O_NoData.tsx';

export const T_Events = ({events}) => {
  if (!events?.length) {
    return <O_NoData />;
  }
  return (
    <FlatList
      data={events}
      keyExtractor={({id}) => id}
      renderItem={props => <O_Card {...props} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 32,
  },
});
