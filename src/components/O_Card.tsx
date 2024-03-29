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
      <M_CoverCard city_id={item.city_id} />
      <M_CaptionOnCard item={item} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFCFC',
    overflow: 'hidden',
    borderRadius: 8,
  },
});
