import React, { useState } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { THEME } from '../theme'

export const ProfileScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  return (
    <View style={{ width: deviceWidth }}>
      <Text style={{textAlign: "center"}}>Profile</Text>
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
