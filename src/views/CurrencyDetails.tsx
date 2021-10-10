import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import BaseLoadingSpinner from '../components/BaseLoadingSpinner';
import { Currency } from '../types/models';
import './CurrencyDetails.scss';

interface Props {
  currencies: Currency[] | null;
}

function CurrencyDetails({ currencies }: Props) {
  const { symbol } = useParams<{ symbol: string }>();
  const [currency, setCurrency] = useState<Currency | null | 'Not found'>(null);

  useEffect(() => {
    if (currencies !== null) {
      setCurrency(
        currencies.find((currency) => currency.name === symbol) || 'Not found'
      );
    }
  }, [currencies, symbol]);

  return (
    <section className={`currency ${currency == null && 'loading'} `}>
      {currency == null && (
        <div className="currency__spinner">
          <BaseLoadingSpinner />
        </div>
      )}
      {currency === 'Not found' && (
        <div>Currency not found in Top 10 cryptocurrencies.</div>
      )}
      {currency != null && currency !== 'Not found' && (
        <Fragment>
          <div className="currency__row">
            <h2 className="currency__elem currency__header">
              <img
                src={currency.logo}
                alt=""
                srcSet=""
                width="34"
                height="34"
              />
              <div className="currency__header-text">
                <span>{currency.fullName} Price</span>
                <span className="currency__symbol">{currency.name} </span>
              </div>
            </h2>
            <div className="currency__elem currency__price">
              {currency.price}
              <span
                className={`currency__change ${
                  !currency.change24hDisplay.includes('-')
                    ? 'currency__change--up'
                    : 'currency__change--down'
                }`}
              >
                {currency.change24hDisplay}
              </span>
            </div>
          </div>
          <div className="currency__chart currency__elem">
            {/* <CurrencyDetailsChart /> */}
          </div>
          {/* <CurrencyDetailsHistoTable
               className="currency__elem"
               currencyName="currency.fullName"
               currencySymbol="currency.name"
             /> */}
        </Fragment>
      )}
    </section>
  );
}
export default CurrencyDetails;
