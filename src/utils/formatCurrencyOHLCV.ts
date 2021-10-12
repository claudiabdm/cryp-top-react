import { CurrencyOHLCVAPI } from '../types/models';

export function formatCurrencyOHLCV(res: CurrencyOHLCVAPI) {
  if (res.Data.Data) {
    return {
      lastTs: res.Data.TimeFrom,
      data: res.Data.Data.map((elem) => ({
        ...elem,
        timeDisplay: new Date(elem.time * 1000).toLocaleDateString(),
      })),
    };
  }
  return {
    lastTs: 0,
    data: [],
  };
}
