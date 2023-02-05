import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { ActualEventsScreen } from './screens/ActualEventsScreen';
import { EventInfoScreen } from './screens/EventInfoScreen';
import { EventPlayScreen } from './screens/EventPlayScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ActualEventsState } from './context/actual_events/ActualEventsState';
import { EventInfoState } from './context/event_info/EventInfoState';
import { EventPlayState } from './context/event_play/EventPlayState';

import { changeScreen } from './store/ScreenAction';

export const MainLayout = () => {
  const { eventId, eventPlay, inProfile } = useSelector(state => state.screenReducer);
  const dispatch = useDispatch();

  const profileAction = () => dispatch(changeScreen({inProfile: true}));
  const nameAction = () => dispatch(changeScreen({eventId: null, eventPlay: null, inProfile: null, checkpointId: null}));

  let content = null;
  let backAction = null;

  if (inProfile) {
    content = (
      <ProfileScreen />
    );
    backAction = () => dispatch(changeScreen({inProfile: null}));
  } else if (eventId == null) {
    content = (
      <ActualEventsState>
        <ActualEventsScreen />
      </ActualEventsState>
    );
  } else if (eventPlay) {
    content = (
      <EventPlayState>
        <EventPlayScreen />
      </EventPlayState>
    );
    backAction = () => dispatch(changeScreen({eventPlay: null}));
  } else {
    content = (
      <EventInfoState>
        <EventInfoScreen />
      </EventInfoState>
    );
    backAction = () => dispatch(changeScreen({eventId: null}));
  }

  return (
    <View style={styles.wrapper}>
      <Navbar name='Бегущий Город' nameAction={nameAction} backAction={backAction} profileAction={profileAction}/>
      <View style={styles.container}>
      {content}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    //flex: 1
  },
  wrapper: {
    //flex: 1
  }
});
