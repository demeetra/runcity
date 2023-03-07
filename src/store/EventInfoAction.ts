import {EVENT_INFO_FETCH} from './constants';
import {runcityApi} from './runcityApi';

export const fetchEventInfo = eventId => {
  return runcityApi.GET(
    'event',
    data => {
      return {
        type: EVENT_INFO_FETCH,
        eventInfo: data,
        actualEvents: Object.keys(data).map(key => data[key]),
      };
    },
    {id: eventId},
    false,
  );
};
