import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import RNLoginScreen from 'react-native-login-screen';
import {THEME} from '../theme';
import {userSignIn} from '../store/UserAction';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user, error: userLoginError} = useSelector(state => state.userReducer);

  if (user) {
    navigation.popToTop();
    return navigation.navigate('Profile');
  }

  var error_xs = userLoginError && <Text>{userLoginError}</Text>;

  let userEmail = '';
  let userPassword = '';
  // TODO: use own component
  // RNLoginScreen uses Dimensions.get("screen").width witch is not good for web
  return (
    <View style={styles.container}>
      <RNLoginScreen
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
        style={{}}
        loginTextStyle={styles.text}
        signupTextStyle={styles.text}
      />
      {error_xs}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: THEME.PADDING_VERTICAL,
    flex: 1,
  },
  text: {
    fontFamily: 'Rubik',
  },
});
