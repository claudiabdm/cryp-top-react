import { useCallback } from 'react';
import { useParams } from 'react-router';
import useFetchMore from '../hooks/useFetchMore';
import { CurrencyOHLCV } from '../types/models';
import { Column } from '../types/table';
import { formatCurrencyOHLCV } from '../utils/formatCurrencyOHLCV';
import BaseTable from './BaseTable';

import './CurrencyDetailsTable.scss';

interface Props {
  currencyName: string;
  currencyQuote: string;
}

const COLUMNS: { [key: string]: Column } = {
  time: {
    name: 'Date',
    align: 'left',
    component: (row: CurrencyOHLCV) =>
      new Date(row.time * 1000).toLocaleDateString(),
  },
  open: {
    name: 'Open',
    align: 'right',
  },
  high: {
    name: 'High',
    align: 'right',
  },
  low: {
    name: 'Low',
    align: 'right',
  },
  close: {
    name: 'Close',
    align: 'right',
  },
  volumefrom: {
    name: 'Volume From',
    align: 'right',
  },
  volumeto: {
    name: 'Volume To',
    align: 'right',
  },
};

async function fetchUrl(
  symbol: string,
  currencyQuote: string,
  lastTs: number = 0
) {
  const withTs = lastTs ? '&toTs=' + lastTs : '';
  const url = `${process.env.REACT_APP_CRYPTO_API_URL}/v2/histoday?fsym=${symbol}&tsym=${currencyQuote}&limit=10${withTs}&aggregate=1&api_key=${process.env.VUE_APP_API_KEY}`;
  const response = await fetch(url, { method: 'GET' });
  const data = await response.json();
  return formatCurrencyOHLCV(symbol)(data);
}

function CurrencyDetailsTable({ currencyName, currencyQuote }: Props) {
  const { symbol } = useParams<{ symbol: string }>();
  const { state, dispatch } = useFetchMore(
    useCallback(() => fetchUrl(symbol, currencyQuote), [symbol, currencyQuote])
  );

  async function handleLoadMore() {
    dispatch({ type: 'LOADING' });
    fetchUrl(symbol, currencyQuote, state.lastTs - 60 * 60 * 24).then((res) => {
      dispatch({ type: 'ADD_DATA', payload: { ...res } });
    });
  }

  return (
    <article className="histo-table currency__elem">
      <h3 className="histo-table__title">Historical data for {currencyName}</h3>
      <div className="histo-table__table">
        <BaseTable rows={state.data} columns={COLUMNS} />
      </div>
      <button
        className="histo-table__load"
        type="button"
        disabled={state.loading}
        onClick={handleLoadMore}
      >
        {state.loading ? 'Loading...' : 'Show More'}
      </button>
    </article>
  );
}

export default CurrencyDetailsTable;
