import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {AppLoader} from './components/ui/AppLoader';
import {Hamburger} from './components/Hamburger';
import {THEME} from './theme';
import {ActualEventsScreen} from './screens/ActualEventsScreen';
import {EventInfoScreen} from './screens/EventInfoScreen';
import {EventPlayScreen} from './screens/EventPlayScreen';
import {LoginScreen} from './screens/LoginScreen';
import {ProfileScreen} from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    initialRouteName: 'ActualEvents',
    screens: {
      ActualEvents: {
        path: 'ru/events',
      },
      EventInfo: 'ru/events/:eventId',
      EventPlay: 'ru/events/:eventId/online',
      Login: 'ru/people/login',
      Profile: 'ru/people/me',
    },
  },
};

export const MainLayout = () => {
  const [deviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

  const {loading} = useSelector(state => state.runcityApiReducer);
  return (
    <View style={{...styles.container, width: deviceWidth}}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: styles.header,
            headerRight: Hamburger,
          }}>
          <Stack.Screen
            name="ActualEvents"
            component={ActualEventsScreen}
            options={{title: 'События'}}
          />
          <Stack.Screen name="EventInfo" component={EventInfoScreen} />
          <Stack.Screen name="EventPlay" component={EventPlayScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{animation: 'slide_from_right', title: ''}}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{animation: 'slide_from_right', title: ''}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {loading > 0 && <AppLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Rubik',
    // paddingHorizontal: THEME.PADDING_HORIZONTAL,
    // paddingVertical: 16,
    flex: 1,
  },
  header: {
    fontFamily: 'Rubik',
  },
});
