import { ChangeEvent, Dispatch } from 'react';
import './TheHeaderCurrencyQuote.scss';

interface Props {
  currencyQuote: string;
  setCurrencyQuote: Dispatch<React.SetStateAction<string>>;
}

const CURRENCIES = ['USD', 'EUR', 'NOK', 'JPY', 'AUD', 'CHF'];

function TheHeaderCurrencyQuote({ currencyQuote, setCurrencyQuote }: Props) {
  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setCurrencyQuote(e.target.value);
  }
  return (
    <div className="header__select header__elem select">
      <label className="select__label" htmlFor="selectCurrencyQuote">
        Currency quote
      </label>
      <select
        className="select__select"
        value={currencyQuote}
        onChange={handleSelect}
        name="selectCurrencyQuote"
        id="selectCurrencyQuote"
      >
        {CURRENCIES.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TheHeaderCurrencyQuote;
