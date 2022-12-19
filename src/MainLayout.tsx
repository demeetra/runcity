import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { ActualEventsScreen } from './screens/ActualEventsScreen';
import { ActualEventsState } from './context/actual_events/ActualEventsState';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
  const { eventId, changeScreen } = useContext(ScreenContext);

  let actualEvents = (
    <ActualEventsState>
      <ActualEventsScreen />
    </ActualEventsState>
  );

  let specificEvent = (
    <Text>eventId = {eventId}</Text>
  );

  return (
    <View style={styles.wrapper}>
      <Navbar name='Runcity' backAction={eventId == null ? null : () => (changeScreen(null))} />
      <View style={styles.container}>
      { eventId == null ? actualEvents : specificEvent }
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
