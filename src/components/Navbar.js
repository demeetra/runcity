import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'
import { AppTextBold } from './ui/AppTextBold'

export const Navbar = ({ name, backAction, profileAction }) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarIos,
          android: styles.navbarAndroid
        })
      }}
    >
      <AppButton onPress={backAction} opacity={backAction == null ? 0 : 1}>Back</AppButton>
      <AppTextBold style={styles.text}>{name}</AppTextBold>
      <AppButton onPress={profileAction}>Profile</AppButton>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff',
    fontSize: 20,
    textAlign: 'center',
  }
})
