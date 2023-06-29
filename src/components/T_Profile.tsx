import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppButton} from './ui/AppButton';
import {M_ProfileName} from './M_ProfileName';
import {M_ProfileRow} from './M_ProfileRow';

export const T_Profile = ({user, doLogout}) => {
  return (
    <View style={styles.container}>
      <M_ProfileName user={user} />
      <M_ProfileRow
        text="События"
        image={require('../../assets/icon_events.png')}
      />
      <M_ProfileRow
        text="Личный кабинет"
        image={require('../../assets/icon_login.png')}
      />
      <M_ProfileRow
        text="Достижения"
        image={require('../../assets/icon_achivements.png')}
      />
      <M_ProfileRow
        text="Настройки"
        image={require('../../assets/icon_settings.png')}
      />
      <M_ProfileRow
        text="На сайт"
        image={require('../../assets/icon_web_site.png')}
      />
      <AppButton onPress={doLogout} style={styles.button}>
        Выйти
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    marginTop: '20%',
  },
});
