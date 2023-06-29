import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {userLogOut} from '../store/UserAction';
import {T_Profile} from '../components/T_Profile';
import {T_Screen} from '../components/T_Screen';

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.userReducer);
  const doLogout = () => dispatch(userLogOut()); // TODO: move to subcomponent

  if (!user) {
    navigation.popToTop();
    return navigation.navigate('Login');
  }

  return (
    <T_Screen>
      <T_Profile user={user} doLogout={doLogout} />
    </T_Screen>
  );
};
