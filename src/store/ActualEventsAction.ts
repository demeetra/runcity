import {ACTUAL_EVENTS_FETCH} from './constants';
import {runcityApi} from './runcityApi';

export const fetchActualEvents = () => {
  return runcityApi.GET(
    'events',
    data => {
      return {
        type: ACTUAL_EVENTS_FETCH,
        actualEvents: Object.keys(data).map(key => data[key]),
      };
    },
    {},
    false,
  );
};
