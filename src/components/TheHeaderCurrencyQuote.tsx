import './TheHeaderCurrencyQuote.scss';

const CURRENCIES = ['USD', 'EUR', 'NOK', 'JPY', 'AUD', 'CHF'];

function TheHeaderCurrencyQuote() {
  return (
    <div className="header__select header__elem select">
      <label className="select__label" htmlFor="selectCurrencyQuote">
        Currency quote
      </label>
      <select
        className="select__select"
        // v-model="currencyQuote"
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
