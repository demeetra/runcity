import React, { useState, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/ui/AppButton';
import { THEME } from '../theme';
import { userLogOut } from '../store/UserAction';

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userReducer);

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  return (
    <View style={{ width: deviceWidth }}>
      <Text style={{textAlign: "center"}}>{JSON.stringify(user, null, 2)}</Text>
      <AppButton onPress={() => dispatch(userLogOut())}>LogOut</AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    paddingBottom: 30
  }
})
