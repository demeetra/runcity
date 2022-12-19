import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { THEME } from '../theme'
import { AppLoader } from '../components/ui/AppLoader'
import { AppButton } from '../components/ui/AppButton'
import { AppText } from '../components/ui/AppText'
import { EventInfoContext } from '../context/event_info/EventInfoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const EventInfoScreen = () => {
  const { eventId, changeScreen } = useContext(ScreenContext)
  const { eventInfo, fetchEventInfo, loading, error } = useContext(EventInfoContext)

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const loadEventInfo = useCallback( async () => await fetchEventInfo(eventId), [eventId, fetchEventInfo] )
  useEffect( () => { loadEventInfo() }, [] )

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onpress={loadEventInfo}>Repeat</AppButton>
      </View>
    )
  }
  return (
    <View style={{ width: deviceWidth }}>
      <Text style={{textAlign: "center"}}>{eventInfo.title}</Text>
      <Text></Text>
      <AppButton onPress={() => (null)}>Start</AppButton>
      <Text></Text>
      <Image source={{ uri: eventInfo.image}} style={{width: deviceWidth, height: 150}} />
      <Text>{eventInfo.description}</Text>
    </View>
  )
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
