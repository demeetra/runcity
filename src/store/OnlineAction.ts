import {ONLINE_FETCH} from './constants';
import {runcityApi} from './runcityApi';

export const fetchOnline = eventId => {
  console.log('fetchOnline call', eventId, '/events/' + eventId + '/online');
  if (!eventId) {
    return {type: null};
  }
  return runcityApi.GET(
    '/events/' + eventId + '/online/',
    data => {
      return {type: ONLINE_FETCH, data};
    },
    {out_filter: 'json'},
  );
};
