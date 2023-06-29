import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/ui/AppButton';
import {M_CoverCard} from '../components/M_CoverCard';
import {M_EventRow} from '../components/M_EventRow';

/*
      <Image
        source={{
          uri:
            eventInfo.online_img1_uri &&
            eventInfo.online_img1_uri.replace(
              /img.public.runcitytest.org/,
              'img.runcity.org',
            ),
        }}
        style={{height: 600, resizeMode: 'contain'}}
      />
*/

export const T_EventInfo = ({item, doStart}) => {
  return (
    <>
      <M_EventRow
        left="Дата"
        right={new Date(Number(item.date_start * 1000)).toLocaleDateString(
          'ru-ru',
        )}
      />
      <View style={styles.image}>
        <M_CoverCard city_id={item.city_id} />
      </View>
      <M_EventRow left="Кол-во игроков" right="1-4" />
      <M_EventRow left="Категории" right="" />
      <AppButton onPress={doStart} style={styles.button}>
        Поехали
      </AppButton>
      <Text />
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  nameText: {
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginTop: '20%',
  },
});
