import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import TheHeader from './components/TheHeader';
import { Currency } from './types/models';
import { fetchTopCurrencies } from './utils/fetchTopCurrencies';
import CurrencyDetails from './views/CurrencyDetails';
import TopCurrencies from './views/TopCurrencies';

function App() {
  const [currencies, setCurrencies] = useState<Currency[] | null>(null);
  const [currencyQuote, setCurrencyQuote] = useState('USD');

  useEffect(() => {
    fetchTopCurrencies(currencyQuote).then((data) => {
      setCurrencies(data);
    });
  }, [currencyQuote]);

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
