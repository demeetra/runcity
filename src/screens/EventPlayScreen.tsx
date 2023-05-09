import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {THEME} from '../theme';
import {AppButton} from '../components/ui/AppButton';
import {changeScreen} from '../store/ScreenAction';
import {
  fetchTitlesEventPlay,
  fetchCheckpointEventPlay,
  updateCheckpointEventPlay,
} from '../store/EventPlayAction';
import {fetchOnline} from '../store/OnlineAction';

function formatCheckpoint(
  cpinfo,
  deviceWidth,
  doUpdateCheckpointEventPlay,
  textAddr,
  setTextAddr,
  textAnsw,
  setTextAnsw,
) {
  if (cpinfo == null) {
    return;
  }
  if (!(cpinfo.id in textAddr)) {
    setTextAddr({...textAddr, [cpinfo.id]: cpinfo.legend_address});
  }
  if (!(cpinfo.id in textAnsw)) {
    setTextAnsw({...textAnsw, [cpinfo.id]: cpinfo.answer});
  }
  const addressInput = cpinfo.is_puzzle !== '0' && (
    <View>
      <Text>Адрес:</Text>
      <TextInput
        style={styles.input}
        onChangeText={newText =>
          setTextAddr({...textAddr, [cpinfo.id]: newText})
        }
        onEndEditing={() =>
          doUpdateCheckpointEventPlay(cpinfo.id, {answer: textAddr[cpinfo.id]})
        }
        defaultValue={textAddr[cpinfo.id]}
      />
    </View>
  );
  const imageElement = (
    <FlatList
      data={cpinfo.images}
      keyExtractor={({uri}) => uri}
      renderItem={({item}) => {
        const uri = item.uri.replace(
          /img.public.runcitytest.org/,
          'img.runcity.org',
        ); // TODO: fix server
        if (Number(item.is_image)) {
          return (
            <Image
              source={{uri}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                width: deviceWidth,
                height: 160,
                borderRadius: 8,
                resizeMode: 'contain',
              }}
            />
          );
        }
        if (Number(item.is_audio)) {
          return (
            <TouchableOpacity onPress={() => Linking.openURL(uri)}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{color: 'white'}}>
                (ссылка на аудио)
              </Text>
            </TouchableOpacity>
          );
        }
      }}
    />
  );
  return (
    <View>
      <Text>{cpinfo.title}</Text>
      <Text>{cpinfo.legend_address}</Text>
      <Text>{cpinfo.legend_desc}</Text>
      <Text>{cpinfo.legend_quest}</Text>
      {imageElement}
      {addressInput}
      <Text>Ответ:</Text>
      <TextInput
        style={styles.input}
        onChangeText={newText =>
          setTextAnsw({...textAnsw, [cpinfo.id]: newText})
        }
        onEndEditing={() =>
          doUpdateCheckpointEventPlay(cpinfo.id, {answer: textAnsw[cpinfo.id]})
        }
        defaultValue={textAnsw[cpinfo.id]}
      />
    </View>
  );
}

export const EventPlayScreen = ({navigation, route}) => {
  const {eventId} = route.params;
  const {checkpointId} = useSelector(state => state.screenReducer);
  const onlineState = useSelector(state => state.onlineReducer);
  const {user} = useSelector(state => state.userReducer);
  const {titles, checkpoints} = useSelector(state => state.eventPlayReducer);
  const [textAddr, setTextAddr] = useState({});
  const [textAnsw, setTextAnsw] = useState({});

  const dispatch = useDispatch();

  /*useEffect(() => {
    if (titles != null) {
      changeScreen({checkpointId: titles[0]?.id})
    }
  }, [titles]);*/

  const [deviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2,
  );

  const loadTitlesEventPlay = useCallback(
    () => dispatch(fetchTitlesEventPlay(eventId)),
    [dispatch, eventId],
  );
  useEffect(() => {
    loadTitlesEventPlay();
  }, [loadTitlesEventPlay]);
  const loadCheckpointEventPlay = useCallback(
    () => dispatch(fetchCheckpointEventPlay(checkpointId)),
    [dispatch, checkpointId],
  );
  useEffect(() => {
    loadCheckpointEventPlay();
  }, [loadCheckpointEventPlay]);

  const loadOnline = useCallback(
    () => dispatch(fetchOnline(eventId)),
    [dispatch, eventId],
  );
  useEffect(() => {
    loadOnline();
  }, [loadOnline]);
  console.log('onlineState', onlineState);

  if (!user) {
    return navigation.navigate('Login');
  }

  const checkpointsView = (
    <FlatList
      horizontal
      data={titles}
      keyExtractor={({id}) => id}
      renderItem={({item}) => (
        <View>
          <AppButton
            onPress={() => dispatch(changeScreen({checkpointId: item.cp_id}))}>
            {item.sort_order}
          </AppButton>
        </View>
      )}
    />
  );

  const checkpointInfo =
    checkpointId == null
      ? null
      : formatCheckpoint(
          checkpoints[checkpointId],
          deviceWidth,
          (...args) => dispatch(updateCheckpointEventPlay(...args)),
          textAddr,
          setTextAddr,
          textAnsw,
          setTextAnsw,
        );

  return (
    <View style={{width: deviceWidth}}>
      <Text style={styles.eventText}>
        Team {onlineState.team && onlineState.team.snumber_full}
      </Text>
      {checkpointsView}
      <Text />
      {checkpointInfo}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    margin: 8,
  },
  eventText: {
    color: '#414141',
    fontSize: 20,
    textAlign: 'center',
  },
});
