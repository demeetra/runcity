import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Navbar} from './components/Navbar';
import {THEME} from './theme';
import LoginScreen from 'react-native-login-screen';
import {ActualEventsScreen} from './screens/ActualEventsScreen';
import {EventInfoScreen} from './screens/EventInfoScreen';
import {EventPlayScreen} from './screens/EventPlayScreen';
import {ProfileScreen} from './screens/ProfileScreen';

import {changeScreen} from './store/ScreenAction';
import {userSignIn} from './store/UserAction';

export const MainLayout = () => {
  const dispatch = useDispatch();
  const {isSignedIn, eventId, eventPlay, inProfile} = useSelector(
    state => state.screenReducer,
  );
  const {user, error: userLoginError} = useSelector(state => state.userReducer);

  if (!isSignedIn) {
    var error_xs = userLoginError && <Text>{userLoginError}</Text>;

    let userEmail = '';
    let userPassword = '';
    return (
      <View style={{flex: 1}}>
        {error_xs}
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
      </View>
    );
  }

  const profileAction = () => dispatch(changeScreen({inProfile: true}));
  const nameAction = () =>
    dispatch(
      changeScreen({
        eventId: null,
        eventPlay: null,
        inProfile: null,
        checkpointId: null,
      }),
    );

  let content = null;
  let backAction = null;

  if (inProfile) {
    content = <ProfileScreen />;
    backAction = () => dispatch(changeScreen({inProfile: null}));
  } else if (eventId == null) {
    content = <ActualEventsScreen />;
  } else if (eventPlay) {
    content = <EventPlayScreen />;
    backAction = () => dispatch(changeScreen({eventPlay: null}));
  } else {
    content = <EventInfoScreen />;
    backAction = () => dispatch(changeScreen({eventId: null}));
  }

  const profileName = user.first_name + '\n' + user.last_name;
  return (
    <View style={styles.wrapper}>
      <Navbar
        name="Бегущий Город"
        nameAction={nameAction}
        backAction={backAction}
        profileAction={profileAction}
        profileName={profileName}
      />
      <View style={styles.container}>{content}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    //flex: 1
  },
  wrapper: {
    //flex: 1
  },
});
