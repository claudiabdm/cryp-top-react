import { CurrencyOHLCVAPI } from '../types/models';

export function formatCurrencyOHLCV(symbol: string) {
  return function formatData(res: CurrencyOHLCVAPI) {
    if (res.Data.Data) {
      return {
        lastTs: res.Data.TimeFrom,
        data: res.Data.Data.map((elem) => ({
          ...elem,
          id: `${elem.time}-${symbol}`,
          timeDisplay: new Date(elem.time * 1000).toLocaleDateString(),
        })).sort((a, b) => b.time - a.time),
      };
    }
    return {
      lastTs: 0,
      data: [],
    };
  };
}
