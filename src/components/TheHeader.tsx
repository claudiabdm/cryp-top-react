import { Link, NavLink, useParams } from 'react-router-dom';
import TheHeaderCurrencyQuote from './TheHeaderCurrencyQuote';
import { Dispatch } from 'react';

import './TheHeader.scss';

interface Props {
  currencyQuote: string;
  setCurrencyQuote: Dispatch<React.SetStateAction<string>>;
}

function TheHeader({currencyQuote, setCurrencyQuote}: Props) {
  let { symbol } = useParams<{ symbol: string }>();

  return (
    <header className="header">
      <h1 className="header__title header__elem">
        <Link className="header__title-link" to="/">
          CrypTop
        </Link>
      </h1>
      <div className="header__row">
        <nav className="header__nav breadcrumbs header__elem">
          <NavLink
            className="breadcrumbs__link"
            to="/"
            activeClassName="breadcrumbs__link--active"
          >
            Top 10 currencies
          </NavLink>
          {symbol && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="breadcrumbs__separator"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          <NavLink
            className="breadcrumbs__link"
            to={`/currencies/${symbol}`}
            activeClassName="breadcrumbs__link--active"
          >
            {symbol}
          </NavLink>
        </nav>
        <TheHeaderCurrencyQuote setCurrencyQuote={setCurrencyQuote} currencyQuote={currencyQuote} />
      </div>
      <div className="header__row">{/* <TheCurrenciesTicker /> */}</div>
    </header>
  );
}

export default TheHeader;
