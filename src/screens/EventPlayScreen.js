import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from '../components/ui/AppButton'
import { AppLoader } from '../components/ui/AppLoader'
import { ScreenContext } from '../context/screen/screenContext'
import { EventPlayContext } from '../context/event_play/EventPlayContext'

function formatCheckpoint(cpinfo, deviceWidth) {
  if (cpinfo == null)
    return;
  const addressInput = cpinfo.is_riddle && (
    <View>
      <Text>Адрес:</Text>
      <TextInput style={styles.input}/>
    </View>
  );
  const imageElement = cpinfo.image && (
    <Image source={{ uri: cpinfo.image}} style={{width: deviceWidth, height: 150}} />
  );
  return (
    <View>
      <Text>{cpinfo.title}</Text>
      <Text>{cpinfo.is_riddle ? 'Загадка' : cpinfo.address}</Text>
      <Text>{cpinfo.text}</Text>
      {imageElement}
      {addressInput}
      <Text>Ответ:</Text>
      <TextInput style={styles.input}/>
    </View>
  );
};

export const EventPlayScreen = () => {
  const { eventId, checkpointId, changeScreen } = useContext(ScreenContext)
  const { titles, checkpoints, fetchTitlesEventPlay, fetchCheckpointEventPlay, loading, error } = useContext(EventPlayContext)

  /*useEffect(() => {
    if (titles != null) {
      changeScreen({checkpointId: titles[0]?.id})
    }
  }, [titles]);*/

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  console.log('checkpointId', checkpointId)

  const loadTitlesEventPlay = useCallback( async () => await fetchTitlesEventPlay(eventId), [eventId, fetchTitlesEventPlay] )
  useEffect( () => { loadTitlesEventPlay() }, [] )
  const loadCheckpointEventPlay = useCallback( async () => await fetchCheckpointEventPlay(checkpointId), [checkpointId, fetchCheckpointEventPlay])
  useEffect( () => { loadCheckpointEventPlay() }, [checkpointId] )

  console.log('titles', titles)
  console.log('checkpoints', checkpoints)

  const checkpointsView = (<FlatList
    horizontal
    data={titles}
    keyExtractor={({ id }) => id}
    renderItem={({ item }) => (
      <View>
        <AppButton onPress={() => changeScreen({checkpointId: item.id})}>{item.title}</AppButton>
      </View>
    )}
  />);

  const checkpointInfo = checkpointId == null ? null : formatCheckpoint(checkpoints[checkpointId], deviceWidth);

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onpress={loadTitlesEventPlay}>Repeat</AppButton>
      </View>
    )
  }

  return (
    <View style={{ width: deviceWidth }}>
      <Text style={{textAlign: "center"}}>EventPlay</Text>
      {checkpointsView}
      <Text></Text>
      {checkpointInfo}
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
})
