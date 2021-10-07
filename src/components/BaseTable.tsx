import { AriaAttributes, ReactElement, useEffect, useState } from 'react';
import { Column, ColumnState, ColumnType, Row } from '../types/table';
import { sortRows } from '../utils/sorting';
import BaseLoadingSpinner from './BaseLoadingSpinner';
import './BaseTable.scss';
export interface Props {
  rows: Row[] | null;
  columns: { [key: string]: Column };
  rowContent?: ReactElement<any> | null;
}

function BaseTable({ rows = null, columns, rowContent = null }: Props) {
  const [alertActive, setAlertActive] =
    useState<AriaAttributes['aria-live']>('polite');
  const [ariaBusy, setAriaBusy] = useState(true);
  const [columnState, setColumnState] = useState<ColumnState>('none');
  const [sortedRows, setSortedRows] = useState<Row[] | null>(null);
  const [columnSorted, setColumnSorted] = useState<{
    name: string;
    type: ColumnType;
  }>({
    name: '',
    type: 'string',
  });

  useEffect(() => {
    if (rows != null) {
      setAlertActive('off');
      setAriaBusy(false);
      setSortedRows(rows);
    }
  }, [rows]);

  function handleSortBy(column: Column, columnName: string) {
    // changeColumnState(columnName);
    // setColumnSorted({ name: columnName, type: column.type || 'string' });
    // setSortedRows(sortRows(rows as Row[], { name: columnName, type: column.type || 'string' }, columnState) as Row[]);
  }

  // function changeColumnState(newColumnName: string) {
  //   if (columnSorted.name !== '' && columnSorted.name !== newColumnName) {
  //     setColumnState('up');
  //     return;
  //   }
  //   if (columnState === 'none') {
  //     setColumnState('up');
  //   } else if (columnState === 'up') {
  //     setColumnState('down');
  //   } else {
  //     setColumnState('none');
  //     setColumnSorted({ name: '', type: 'string' });
  //   }
  // }

  return (
    <div className="table-outer">
      <div className="table-inner">
        <table className="table">
          <thead className="table__header">
            <tr>
              {Object.entries(columns).map(([columnName, column]) => (
                <th
                  scope="col"
                  data-col={columnName}
                  key={columnName}
                  className="table__cell"
                >
                  <button
                    type="button"
                    aria-label={`Sort by ${columnName} ${columnState}`}
                    onClick={() => handleSortBy(column, columnName)}
                    className={`table__cell-inner table__cell-inner--flex table__cell-inner--button ${column.align}`}
                  >
                    <span>{column.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className={`table__icon table__icon--${columnState} ${
                        columnSorted.name !== columnName && 'table__icon--none'
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
                      />
                    </svg>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="table__body"
            role="alert"
            aria-live={alertActive}
            aria-busy={ariaBusy}
          >
            {sortedRows == null ? (
              <tr>
                <td
                  className="center table__spinner"
                  colSpan={Object.keys(columns).length}
                >
                  <BaseLoadingSpinner />
                </td>
              </tr>
            ) : sortedRows.length === 0 ? (
              <tr>
                <td className="center" colSpan={Object.keys(columns).length}>
                  Data not found
                </td>
              </tr>
            ) : (
              sortedRows.map((row) => (
                <tr className="table__row list-complete-item" key={row.id}>
                  {Object.entries(columns).map(([columnName, column]) => (
                    <td
                      key={columnName}
                      className={`table__cell ${column.align}`}
                      data-col="columnName"
                    >
                      {rowContent || (
                        <div className="table__cell-inner">
                          {(column.component && column.component({ ...row })) ||
                            row[columnName]}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BaseTable;
