import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { ActualEventsScreen } from './screens/ActualEventsScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

  return (
    <View style={styles.wrapper}>
      <Navbar name='Runcity' />
      <View style={styles.container}>
        <ActualEventsScreen />
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
