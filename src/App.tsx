import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import TheHeader from './components/TheHeader';
import { useFetch } from './hooks/useFetch';
import { Currency } from './types/models';
import { formatTopCurrencies } from './utils/formatTopCurrencies';
import CurrencyDetails from './views/CurrencyDetails';
import TopCurrencies from './views/TopCurrencies';

function App() {
  const [currencyQuote, setCurrencyQuote] = useState('USD');
  const url = `${process.env.REACT_APP_CRYPTO_API_URL}/top/totaltoptiervolfull?limit=10&tsym=${currencyQuote}&api_key=${process.env.REACT_APP_API_KEY}`;
  const { data: currencies, error } = useFetch<Currency[]>(
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
            <CurrencyDetails
              currencies={currencies}
              currencyQuote={currencyQuote}
            />
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
