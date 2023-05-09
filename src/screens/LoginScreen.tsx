import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dimensions, StyleSheet, Text} from 'react-native';
import RNLoginScreen from 'react-native-login-screen';
import {THEME} from '../theme';
import {userSignIn} from '../store/UserAction';

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user, error: userLoginError} = useSelector(state => state.userReducer);

  const [deviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

  if (user) {
    navigation.popToTop();
    return navigation.navigate('Profile');
  }

  var error_xs = userLoginError && <Text>{userLoginError}</Text>;

  let userEmail = '';
  let userPassword = '';
  return (
    <>
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
        style={{width: deviceWidth}}
        loginTextStyle={styles.text}
        signupTextStyle={styles.text}
      />
      {error_xs}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rubik',
  },
});
