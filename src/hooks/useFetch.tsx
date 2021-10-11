import { useEffect, useReducer } from 'react';

type Action<T> =
  | { type: 'LOADING' }
  | { type: 'RESPONSE_COMPLETE'; payload: { response: T } }
  | { type: 'ERROR'; payload: { error: any } };

interface State<T> {
  data: T | null;
  loading: boolean;
  error: any | null;
}

const initialState: State<null> = {
  data: null,
  loading: true,
  error: null,
};

const LOADING = 'LOADING';
const RESPONSE_COMPLETE = 'RESPONSE_COMPLETE';
const ERROR = 'ERROR';

function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case LOADING:
      return {
        data: null,
        loading: true,
        error: null,
      };
    case RESPONSE_COMPLETE:
      return {
        data: action.payload.response,
        loading: false,
        error: null,
      };
    case ERROR:
      return {
        data: null,
        loading: false,
        error: action.payload.error,
      };
  }
}

export default function useFetch<T, U>(
  url: RequestInfo,
  options: RequestInit,
  formatData = (data: any) => data
) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOADING });
    async function fetchUrl(url: RequestInfo) {
      try {
        const response = await fetch(url, options);
        const data = (await response.json()) as T;
        dispatch({
          type: RESPONSE_COMPLETE,
          payload: { response: formatData(data) },
        });
      } catch (error) {
        dispatch({ type: ERROR, payload: { error } });
      }
    }
    fetchUrl(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return [state.data, state.loading, state.error] as [U | null, boolean, any];
}
