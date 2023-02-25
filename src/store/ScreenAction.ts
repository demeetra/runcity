import {SCREEN_CHANGE, SCREEN_RESET} from './constants';

export const changeScreen = payload => {
  return {type: SCREEN_CHANGE, payload};
};

export const resetScreen = () => {
  return {type: SCREEN_RESET};
};
