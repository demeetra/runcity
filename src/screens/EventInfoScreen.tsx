import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchEventInfo} from '../store/EventInfoAction';
import {T_EventInfo} from '../components/T_EventInfo';
import {T_Screen} from '../components/T_Screen';

export const EventInfoScreen = ({route, navigation}) => {
  const {eventId} = route.params;
  const {eventInfo} = useSelector(state => state.eventInfoReducer);

  const dispatch = useDispatch();

  const loadEventInfo = useCallback(
    () => dispatch(fetchEventInfo(eventId)),
    [dispatch, eventId],
  );

  useEffect(() => {
    loadEventInfo();
  }, [loadEventInfo]);

  useEffect(() => {
    navigation.setOptions({headerTitle: eventInfo?.name});
  }, [navigation, eventInfo]);

  const doStart = () => navigation.navigate('EventPlay', {eventId});

  return (
    <T_Screen hasData={eventInfo !== null}>
      <T_EventInfo item={eventInfo} doStart={doStart} />
    </T_Screen>
  );
};
