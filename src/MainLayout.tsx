import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { ActualEventsScreen } from './screens/ActualEventsScreen';
import { EventInfoScreen } from './screens/EventInfoScreen';
import { EventPlayScreen } from './screens/EventPlayScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ActualEventsState } from './context/actual_events/ActualEventsState';
import { EventInfoState } from './context/event_info/EventInfoState';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
  const { eventId, eventPlay, inProfile, changeScreen } = useContext(ScreenContext);


  const profileAction = () => (changeScreen({inProfile: true}));
  const nameAction = () => (changeScreen({eventId: null, eventPlay: null, inProfile: null}));

  let content = null;
  let backAction = null;

  if (inProfile) {
    content = (
      <ProfileScreen />
    );
    backAction = () => (changeScreen({inProfile: null}));
  } else if (eventId == null) {
    content = (
      <ActualEventsState>
        <ActualEventsScreen />
      </ActualEventsState>
    );
  } else if (eventPlay) {
    content = (
      <EventPlayScreen />
    );
    backAction = () => (changeScreen({eventPlay: null}));
  } else {
    content = (
      <EventInfoState>
        <EventInfoScreen />
      </EventInfoState>
    );
    backAction = () => (changeScreen({eventId: null}));
  }

  return (
    <View style={styles.wrapper}>
      <Navbar name='Runcity' nameAction={nameAction} backAction={backAction} profileAction={profileAction}/>
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
