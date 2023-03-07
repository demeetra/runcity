import {
  EVENT_PLAY_FETCH_TITLES,
  EVENT_PLAY_FETCH_CHECKPOINT,
} from './constants';
import {runcityApi} from './runcityApi';

export const fetchTitlesEventPlay = eventId => {
  if (!eventId) {
    return {type: null};
  }
  return runcityApi.GET(
    'checkpoints',
    data => {
      const titles = Object.keys(data)
        .map(key => data[key])
        .sort((l, r) => {
          return Number(l.sort_order) - Number(r.sort_order);
        });
      return {type: EVENT_PLAY_FETCH_TITLES, titles};
    },
    {id: eventId},
  );
};

export const fetchCheckpointEventPlay = checkpointId => {
  if (!checkpointId) {
    return {type: null};
  }
  return runcityApi.GET(
    'checkpoint',
    data => {
      const update = {[checkpointId]: data};
      return {type: EVENT_PLAY_FETCH_CHECKPOINT, checkpoints: update};
    },
    {cp_id: checkpointId},
  );
};

export const updateCheckpointEventPlay = (checkpointId, params) => {
  return runcityApi.POST('checkpoint', params, data => {
    const update = {[checkpointId]: data};
    dispatch({type: EVENT_PLAY_FETCH_CHECKPOINT, checkpoints: update});
  });
};
