import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { THEME } from '../theme'
import { AppLoader } from '../components/ui/AppLoader'
import { AppButton } from '../components/ui/AppButton'
import { AppText } from '../components/ui/AppText'
import { changeScreen } from '../store/ScreenAction';
import { fetchActualEvents } from '../store/ActualEventsAction';

export const ActualEventsScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  const { actualEvents, loading, error } = useSelector(state => state.actualEventsReducer);
  const dispatch = useDispatch();

  const loadActualEvents = () => dispatch(fetchActualEvents());
  useEffect(() => {loadActualEvents();}, []);

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
              <TouchableOpacity onPress={() => dispatch(changeScreen({eventId: item.id}))}>
                <View style={styles.eventCardView}>
                  <Text style={{...styles.eventCardText, fontSize: 16, fontWeight: 'bold'}}>{item.place.toUpperCase()}</Text>
                  <Text style={{...styles.eventCardText, fontSize: 14}}>{item.name.toUpperCase()}</Text>
                  <Text style={styles.eventCardText}>{new Date(Number(item.date_start * 1000)).toLocaleDateString('ru-ru')}</Text>
                </View>
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
  },
  eventCardView: {
    minHeight: 80,
    backgroundColor: '#007B66',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  eventCardText: {
    color: 'white',
    textAlign: 'center',
  },
})
