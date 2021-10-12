import { useReducer, useEffect } from 'react';

const ADD_DATA = 'ADD_DATA';
const NEW_DATA = 'NEW_DATA';
const LOADING = 'LOADING';

const initialState = {
  data: null,
  lastTs: 0,
  loading: false,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case LOADING:
      return {
        data: state.data,
        lastTs: state.lastTs,
        loading: true,
      };
    case NEW_DATA:
      return {
        data: action.payload.data,
        lastTs: action.payload.lastTs,
        loading: false,
      };
    case ADD_DATA:
      return {
        data: [...state.data, ...action.payload.data],
        lastTs: action.payload.lastTs,
        loading: false,
      };
    default:
      return initialState;
  }
}

function useFetchMore(fetchFn: () => Promise<any>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: LOADING });
    fetchFn().then((res) => {
      dispatch({ type: NEW_DATA, payload: { ...res } });
    });
  }, [fetchFn]);
  return { state, dispatch };
}

export default useFetchMore;
