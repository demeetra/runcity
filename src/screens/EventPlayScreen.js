import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from '../components/ui/AppButton'
import { AppLoader } from '../components/ui/AppLoader'
import { changeScreen } from '../store/ScreenAction';
import { fetchTitlesEventPlay, fetchCheckpointEventPlay, updateCheckpointEventPlay } from '../store/EventPlayAction';

function formatCheckpoint(cpinfo, deviceWidth, updateCheckpointEventPlay, textAddr, setTextAddr, textAnsw, setTextAnsw) {
  if (cpinfo == null)
    return;
  if (!(cpinfo.id in textAddr)) {
    setTextAddr({...textAddr, [cpinfo.id]: cpinfo.address})
  }
  if (!(cpinfo.id in textAnsw)) {
    setTextAnsw({...textAnsw, [cpinfo.id]: cpinfo.answer})
  }
  const addressInput = cpinfo.is_riddle && (
    <View>
      <Text>Адрес:</Text>
      <TextInput
        style={styles.input}
        onChangeText={newText => setTextAddr({...textAddr, [cpinfo.id]: newText})}
        onEndEditing={() => updateCheckpointEventPlay(cpinfo.id, {answer: textAddr[cpinfo.id]})}
        defaultValue={textAddr[cpinfo.id]}
      />
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
      <TextInput
        style={styles.input}
        onChangeText={newText => setTextAnsw({...textAnsw, [cpinfo.id]: newText})}
        onEndEditing={() => updateCheckpointEventPlay(cpinfo.id, {answer: textAnsw[cpinfo.id]})}
        defaultValue={textAnsw[cpinfo.id]}
      />
    </View>
  );
};

export const EventPlayScreen = () => {
  const { eventId, checkpointId } = useSelector(state => state.screenReducer);
  const { titles, checkpoints, loading, error } = useSelector(state => state.eventPlayReducer);
  const [textAddr, setTextAddr] = useState({});
  const [textAnsw, setTextAnsw] = useState({});

  const dispatch = useDispatch();

  /*useEffect(() => {
    if (titles != null) {
      changeScreen({checkpointId: titles[0]?.id})
    }
  }, [titles]);*/

  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const loadTitlesEventPlay = useCallback( async () => dispatch(await fetchTitlesEventPlay(eventId)), [eventId, fetchTitlesEventPlay] );
  useEffect( () => { loadTitlesEventPlay() }, [] )
  const loadCheckpointEventPlay = useCallback( async () => dispatch(await fetchCheckpointEventPlay(checkpointId)), [checkpointId, fetchCheckpointEventPlay])
  useEffect( () => { loadCheckpointEventPlay() }, [checkpointId] )

  const checkpointsView = (<FlatList
    horizontal
    data={titles}
    keyExtractor={({ id }) => id}
    renderItem={({ item }) => (
      <View>
        <AppButton onPress={() => dispatch(changeScreen({checkpointId: item.id}))}>{item.title}</AppButton>
      </View>
    )}
  />);

  const checkpointInfo = checkpointId == null ? null : formatCheckpoint(checkpoints[checkpointId], deviceWidth, (...args) => dispatch(updateCheckpointEventPlay(...args)), textAddr, setTextAddr, textAnsw, setTextAnsw);

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
