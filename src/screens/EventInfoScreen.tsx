import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {THEME} from '../theme';
import {AppLoader} from '../components/ui/AppLoader';
import {AppButton} from '../components/ui/AppButton';
import {AppText} from '../components/ui/AppText';
import {changeScreen} from '../store/ScreenAction';
import {fetchEventInfo} from '../store/EventInfoAction';

export const EventInfoScreen = () => {
  const {eventId} = useSelector(state => state.screenReducer);
  const {eventInfo, loading, error} = useSelector(
    state => state.eventInfoReducer,
  );

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

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onpress={loadEventInfo}>Repeat</AppButton>
      </View>
    );
  }
  return (
    <View style={{width: deviceWidth}}>
      <Text style={styles.nameText}>{eventInfo.name}</Text>
      <Text />
      <AppButton onPress={() => dispatch(changeScreen({eventPlay: true}))}>
        Start
      </AppButton>
      <Text />
      <Image
        source={{uri: eventInfo.online_img2_uri}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: deviceWidth, height: 150}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    paddingBottom: 30,
  },
  nameText: {
    textAlign: 'center',
  },
});
