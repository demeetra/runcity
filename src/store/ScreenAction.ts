import {SCREEN_CHANGE} from './constants';

export function changeScreen(payload) {
  return {type: SCREEN_CHANGE, payload};
}
