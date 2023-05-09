import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import {AppLoader} from './components/ui/AppLoader';
import {AppButton} from './components/ui/AppButton';
import {THEME} from './theme';
import LoginScreen from 'react-native-login-screen';
import {ActualEventsScreen} from './screens/ActualEventsScreen';
import {EventInfoScreen} from './screens/EventInfoScreen';
import {EventPlayScreen} from './screens/EventPlayScreen';
import {ProfileScreen} from './screens/ProfileScreen';

import {userSignIn} from './store/UserAction';

const Stack = createNativeStackNavigator();
const linking = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    initialRouteName: 'ActualEvents',
    screens: {
      ActualEvents: 'ru/events',
      EventInfo: 'ru/events/:eventId',
      EventPlay: 'ru/events/:eventId/online',
    },
  },
};

export const MainLayout = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector(state => state.runcityApiReducer);
  const {user, error: userLoginError} = useSelector(state => state.userReducer);

  if (!user) {
    var error_xs = userLoginError && <Text>{userLoginError}</Text>;

    let userEmail = '';
    let userPassword = '';
    return (
      <>
        <LoginScreen
          onLoginPress={() => {
            if (userEmail) {
              dispatch(userSignIn(userEmail, userPassword));
            }
          }}
          onSignupPress={() => {}}
          onEmailChange={(value: string) => {
            userEmail = value;
          }}
          onPasswordChange={(password: string) => {
            userPassword = password;
          }}
        />
        {error_xs}
      </>
    );
  }

  const profileName = user.first_name; // + ' ' + user.last_name;
  return (
    <View style={styles.container}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={({navigation}) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: styles.header,
            headerRight: () => (
              <AppButton
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                {profileName}
              </AppButton>
            ),
          })}>
          <Stack.Screen
            name="ActualEvents"
            component={ActualEventsScreen}
            options={{title: 'События'}}
          />
          <Stack.Screen name="EventInfo" component={EventInfoScreen} />
          <Stack.Screen name="EventPlay" component={EventPlayScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {loading > 0 && <AppLoader />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Rubik',
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 16,
    flex: 1,
  },
  header: {
    fontFamily: 'Rubik',
  },
  signIn: {
    fontFamily: 'Rubik',
  },
});
