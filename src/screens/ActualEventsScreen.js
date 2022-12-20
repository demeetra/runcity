import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { THEME } from '../theme'
import { AppLoader } from '../components/ui/AppLoader'
import { AppButton } from '../components/ui/AppButton'
import { AppText } from '../components/ui/AppText'
import { ActualEventsContext } from '../context/actual_events/ActualEventsContext'
import { ScreenContext } from '../context/screen/screenContext'

export const ActualEventsScreen = () => {
  const { actualEvents, fetchActualEvents, loading, error } = useContext(ActualEventsContext)
  const { changeScreen } = useContext(ScreenContext)

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const loadActualEvents = useCallback( async () => await fetchActualEvents(), [fetchActualEvents] )
  useEffect( () => { loadActualEvents() }, [] )

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onpress={loadActualEvents}>Repeat</AppButton>
      </View>
    )
  }

  if (actualEvents.length === 0) {
    return (
      <View style={styles.imgWrap}>
        <Image
          style={styles.image}
          source={require('../../assets/no-items.png')}
        />
      </View>
    )
  }

  return (
    <View style={{ width: deviceWidth }}>
      <FlatList
          data={actualEvents}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <View>
              <Text style={{textAlign: "center"}}>{item.title}</Text>
              <TouchableOpacity onPress={() => (changeScreen({eventId: item.id}))}>
                <Image source={{ uri: item.image}} style={{width: deviceWidth, height: 150}} />
              </TouchableOpacity>
            </View>
          )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
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
