import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchActualEvents} from '../store/ActualEventsAction';
import {T_Events} from '../components/T_Events';
import {T_Screen} from '../components/T_Screen';

export const ActualEventsScreen = () => {
  const dispatch = useDispatch();
  const {actualEvents} = useSelector(state => state.actualEventsReducer);

  useEffect(() => {
    dispatch(fetchActualEvents());
  }, [dispatch]);

  return (
    <T_Screen>
      <T_Events events={actualEvents} />
    </T_Screen>
  );
};
