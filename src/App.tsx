import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import TheHeader from './components/TheHeader';
import useFetch from './hooks/useFetch';
import { Currency, TopCurrenciesAPI } from './types/models';
import { formatTopCurrencies } from './utils/formatTopCurrencies';
import CurrencyDetails from './views/CurrencyDetails';
import TopCurrencies from './views/TopCurrencies';

function App() {
  const [currencyQuote, setCurrencyQuote] = useState('USD');
  const url = `${process.env.REACT_APP_CRYPTO_API_URL}/top/totaltoptiervolfull?limit=10&tsym=${currencyQuote}&api_key=${process.env.REACT_APP_API_KEY}`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currencies, loading, error] = useFetch<TopCurrenciesAPI, Currency[]>(
    url,
    {
      method: 'GET',
    },
    formatTopCurrencies(currencyQuote)
  );

  return (
    <Router>
      <Route path={['/currencies/:symbol', '*']}>
        <TheHeader
          setCurrencyQuote={setCurrencyQuote}
          currencyQuote={currencyQuote}
        />
      </Route>
      <main>
        <Switch>
          {error && <div>{error}</div>}
          <Route path="/currencies/:symbol">
            <CurrencyDetails currencies={currencies} />
          </Route>
          <Route path="/">
            <TopCurrencies currencies={currencies} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
