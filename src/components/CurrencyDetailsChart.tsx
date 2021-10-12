import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router';
import { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { useFetch } from '../hooks/useFetch';
import { CurrencyOHLCV } from '../types/models';
import { formatCurrencyOHLCV } from '../utils/formatCurrencyOHLCV';

import './CurrencyDetailsChart.scss';

interface Props {
  currencyQuote: string;
}

const UPDATE_DATA = 'UPDATE_DATA';

const initialState = {
  labels: undefined,
  datasets: [
    {
      backgroundColor: 'hsl(239, 84%, 67%)',
      data: [null],
    },
  ],
};

function chartConfigReducer(state: any, action: any) {
  switch (action.type) {
    case UPDATE_DATA:
      let labels = [] as string[];
      let data = [] as number[];
      if (action.payload.data) {
        for (let elem of action.payload.data) {
          labels.push(elem.timeDisplay);
          data.push(elem.close);
        }
      }
      return {
        labels,
        datasets: [
          {
            backgroundColor: 'hsl(239, 84%, 67%)',
            data,
          },
        ],
      };
    default:
      return initialState;
  }
}

function CurrencyDetailsChart({ currencyQuote }: Props) {
  const { symbol } = useParams<{ symbol: string }>();
  const url = `${process.env.REACT_APP_CRYPTO_API_URL}/v2/histoday?fsym=${symbol}&tsym=${currencyQuote}&limit=30&aggregate=1&api_key=${process.env.VUE_APP_API_KEY}`;
  const { data: currencyOHLCV } = useFetch<{
    data: CurrencyOHLCV[];
    lastTs: number;
  }>(
    url,
    {
      method: 'GET',
    },
    formatCurrencyOHLCV
  );

  const [graphState, dispatch] = useReducer(chartConfigReducer, initialState);

  useEffect(() => {
    if (currencyOHLCV) {
      dispatch({
        type: UPDATE_DATA,
        payload: { data: currencyOHLCV.data },
      });
    }
  }, [currencyOHLCV]);

  const options: ChartOptions = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value: number | string) {
            return value >= 1000
              ? `${Number(value) / 1000}K`
              : Number(value).toFixed(2);
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${symbol} to ${currencyQuote} Price Chart (30 Days)`,
      },
    },
  };

  return (
    <article className="chart">
      <Line
        data={graphState}
        options={options}
        className="chart__line-chart"
      />
    </article>
  );
}

export default CurrencyDetailsChart;
