import { Currency } from '../types/models';
import TopCurrenciesTable from '../components/TopCurrenciesTable';

interface Props {
  currencies: Currency[] | null;
}

function TopCurrencies({ currencies = null }: Props) {
  return <TopCurrenciesTable currencies={currencies}></TopCurrenciesTable>;
}

export default TopCurrencies;
