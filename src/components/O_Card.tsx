import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {M_CaptionOnCard} from './M_CaptionOnCard';
import {M_CoverCard} from './M_CoverCard';

export const O_Card = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('EventInfo', {eventId: item.id})}>
      <M_CoverCard />
      <M_CaptionOnCard item={item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black', // debug
    borderRadius: 8,
  },
});
