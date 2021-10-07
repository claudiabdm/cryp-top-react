import { TopCurrenciesAPI, Currency } from '../types/models';
import { fetchData } from './fetchData';

export function fetchTopCurrencies(currencyQuote: string): Promise<Currency[]> {
  const api = `${process.env.REACT_APP_CRYPTO_API_URL}/top/totaltoptiervolfull?limit=10&tsym=${currencyQuote}`;
  return fetchData<TopCurrenciesAPI>(api, { method: 'GET' }).then((res) => {
    const currencies = [] as Currency[];
    res.Data.forEach((elem) => {
      const currency = {
        id: elem.CoinInfo.Id,
        name: elem.CoinInfo.Name,
        fullName: elem.CoinInfo.FullName,
        logo: `https://www.cryptocompare.com/${elem.CoinInfo.ImageUrl}`,
        price: '-',
        marketCap: '-',
        change24h: '-',
        volume24h: '-',
        priceDisplay: '-',
        marketCapDisplay: '-',
        change24hDisplay: '-',
        volume24hDisplay: '-',
      };
      if (elem.DISPLAY) {
        currencies?.push({
          ...currency,
          price: elem.RAW[currencyQuote].PRICE,
          marketCap: elem.RAW[currencyQuote].MKTCAP,
          change24h: elem.RAW[currencyQuote].CHANGE24HOUR,
          volume24h: elem.RAW[currencyQuote].TOTALVOLUME24H,
          priceDisplay: elem.DISPLAY[currencyQuote].PRICE,
          marketCapDisplay: elem.DISPLAY[currencyQuote].MKTCAP,
          change24hDisplay: elem.DISPLAY[currencyQuote].CHANGE24HOUR,
          volume24hDisplay: elem.DISPLAY[currencyQuote].TOTALVOLUME24H,
        });
      } else {
        currencies?.push(currency);
      }
    });
    return currencies;
  });
}
