/*
request:
  optional auth info in headers
  optional data for POST
response:
  json {status: bool, error: string, data: {}, tokens?: {}}


// const ip_address = Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/';
*/

import {
  RUNCITY_API_CLEAR_ERROR,
  RUNCITY_API_SHOW_ERROR,
  RUNCITY_API_SHOW_LOADER,
  RUNCITY_API_HIDE_LOADER,
} from './constants';

class RuncityApi {
  private static baseUrl: string =
    'https://www.public.runcitytest.org/ru/api_json/';

  getUrl(handler: string, qargs: Record<string, string> = {}): string {
    const searchParams = new URLSearchParams({
      handler,
      ...qargs,
    });
    return RuncityApi.baseUrl + '?' + searchParams.toString();
  }

  GET(
    handler: string,
    callback?: (any) => void,
    qargs: Record<string, string> = {},
    withAuth: boolean = true,
  ) {
    return async (dispatch, getState) => {
      const url = this.getUrl(handler, qargs);
      await this.fetchImpl(dispatch, getState, callback, 'GET', url, withAuth);
    };
  }

  POST(handler: string, data: string, callback?: (any) => void) {
    return async (dispatch, getState) => {
      const url = this.getUrl(handler, qargs);
      return await this.fetchImpl(
        dispatch,
        getState,
        callback,
        'POST',
        url,
        true,
        data,
      );
    };
  }

  private async fetchImpl(
    dispatch,
    getState,
    callback?: (any) => void,
    method: string,
    url: string,
    withAuth: boolean,
    data?: string,
  ) {
    const headers = {
      'Content-Type': 'application/json',
      ...(withAuth
        ? {Authorization: 'Bearer ' + getState().userReducer.token}
        : {}),
    };
    const body = data === undefined ? undefined : JSON.stringify(data);
    try {
      dispatch({type: RUNCITY_API_CLEAR_ERROR});
      dispatch({type: RUNCITY_API_SHOW_LOADER});
      const response = await fetch(url, {method, headers, body});
      const json = await response.json();
      if (!json.status) {
        console.log('Bad reply', json);
        dispatch({type: RUNCITY_API_SHOW_ERROR, error});
      } else {
        // TODO: update tokens
        if (callback !== undefined) {
          dispatch(callback(json.data));
        }
      }
    } catch (exc) {
      console.error(exc, exc.stack);
      dispatch({
        type: RUNCITY_API_SHOW_ERROR,
        error: 'Exception on fetch: ' + exc.toString(),
      });
    } finally {
      dispatch({type: RUNCITY_API_HIDE_LOADER});
    }
  }
}

const initialState = {
  loading: 0,
  errors: [],
};

export const runcityApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case RUNCITY_API_SHOW_LOADER:
      return {...state, loading: state.loading + 1};
    case RUNCITY_API_HIDE_LOADER:
      return {...state, loading: state.loading - 1};
    case RUNCITY_API_CLEAR_ERROR:
      return {...state, errors: []};
    case RUNCITY_API_SHOW_ERROR:
      return {...state, errors: [...state.errors, action.error]};
    default:
      return state;
  }
};

export const runcityApi = new RuncityApi();
