import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {AppButton} from '../components/ui/AppButton';
import {THEME} from '../theme';
import {userLogOut} from '../store/UserAction';

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);

  const [deviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

  if (!user) {
    return navigation.navigate('Login');
  }

  return (
    <View style={{width: deviceWidth}}>
      <Text style={styles.text}>{JSON.stringify(user, null, 2)}</Text>
      <AppButton onPress={() => dispatch(userLogOut())}>LogOut</AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
