import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {THEME} from '../theme';
import {AppButton} from '../components/ui/AppButton';
import {fetchEventInfo} from '../store/EventInfoAction';

export const EventInfoScreen = ({route, navigation}) => {
  const {eventId} = route.params;
  const {eventInfo} = useSelector(state => state.eventInfoReducer);

  const [deviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

  const dispatch = useDispatch();

  const loadEventInfo = useCallback(
    () => dispatch(fetchEventInfo(eventId)),
    [dispatch, eventId],
  );

  useEffect(() => {
    loadEventInfo();
  }, [loadEventInfo]);

  useEffect(() => {
    navigation.setOptions({headerTitle: eventInfo.name});
  }, [navigation, eventInfo]);

  return (
    <View style={{width: deviceWidth}}>
      <Text style={styles.nameText}>{eventInfo.name}</Text>
      <Text />
      <AppButton onPress={() => navigation.navigate('EventPlay', {eventId})}>
        Start
      </AppButton>
      <Text />
      <Image
        source={{
          uri:
            eventInfo.online_img1_uri &&
            eventInfo.online_img1_uri.replace(
              /img.public.runcitytest.org/,
              'img.runcity.org',
            ),
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: deviceWidth, height: 600, resizeMode: 'contain'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    textAlign: 'center',
  },
});
