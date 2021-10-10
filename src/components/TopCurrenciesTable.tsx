import { Link } from 'react-router-dom';
import { Currency } from '../types/models';
import { Column } from '../types/table';
import BaseTable from './BaseTable';
import './TopCurrenciesTable.scss';

interface Props {
  currencies: Currency[] | null;
}

const COLUMNS = {
  name: {
    name: 'Name',
    align: 'left',
    component: (row: Currency) => <NameCell name={row.name} logo={row.logo} />,
  },
  price: {
    name: 'Price',
    align: 'right',
    component: (row: Currency) => getDisplayValue(row, 'priceDisplay'),
  },
  marketCap: {
    name: 'Market Cap',
    align: 'right',
    component: (row: Currency) => getDisplayValue(row, 'marketCapDisplay'),
  },
  change24h: {
    name: 'Change (24h)',
    align: 'right',
    component: (row: Currency) => (
      <Change24hCell name={row.name} change24hDisplay={row.change24hDisplay} />
    ),
  },
  volume24h: {
    name: 'Volume (24h)',
    align: 'right',
    component: (row: Currency) => getDisplayValue(row, 'volume24hDisplay'),
  },
} as { [key: string]: Column };

function TopCurrenciesTable({ currencies }: Props) {
  return <BaseTable rows={currencies} columns={COLUMNS}></BaseTable>;
}

function NameCell({ name = '', logo = '' }) {
  return (
    <Link to={`/currencies/${name}`}>
      <div className="top-crypto-table__name">
        <img
          className="top-crypto-table__logo"
          src={logo}
          alt=""
          srcSet=""
          width="24"
          height="24"
        />
        <span>{name}</span>
      </div>
    </Link>
  );
}

function Change24hCell({ name = '', change24hDisplay = '' }) {
  return (
    <Link to={`/currencies/${name}`}>
      <span className={`${change24hDisplay.includes('-') ? 'down' : 'up'}`}>
        {change24hDisplay}
      </span>
    </Link>
  );
}

function getDisplayValue(row: Currency, columnName: keyof Currency) {
  return <Link to={`/currencies/${row.name}`}>{row[columnName]}</Link>;
}

export default TopCurrenciesTable;
