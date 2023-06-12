import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/ui/AppButton';
import {THEME} from '../theme';
import {userLogOut} from '../store/UserAction';

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);

  if (!user) {
    navigation.popToTop();
    return navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{JSON.stringify(user, null, 2)}</Text>
      <AppButton onPress={() => dispatch(userLogOut())}>LogOut</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: THEME.PADDING_VERTICAL,
  },
  text: {
    textAlign: 'center',
  },
});
