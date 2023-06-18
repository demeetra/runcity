import React from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {O_Card} from '../components/O_Card';
import {O_NoData} from '../components/O_NoData.tsx';

export const T_Events = ({events}) => {
  if (!events?.length) {
    return <O_NoData />;
  }
  return (
    <View style={styles.containter}>
      <FlatList
        data={events}
        contentContainerStyle={styles.content}
        keyExtractor={({id}) => id}
        renderItem={props => <O_Card {...props} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      web: {
        minWidth: 300,
      },
    }),
  },
  content: {
    ...Platform.select({
      web: {
        maxWidth: 364,
      },
    }),
  },
  separator: {
    height: 32,
  },
});
