import { AriaAttributes, ReactElement, useEffect, useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { Column, ColumnDirection, ColumnType, Row } from '../types/table';
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
  const [sortedRows, setSortedRows] = useState<Row[] | []>([]);
  const [sortedColumn, setSortedColumn] = useState<{
    name: string | null;
    type: ColumnType;
    direction: ColumnDirection;
  }>({
    name: null,
    type: 'string',
    direction: 'none',
  });

  useEffect(() => {
    if (rows != null) {
      setAlertActive('off');
      setAriaBusy(false);
    }
  }, [rows]);

  useEffect(() => {
    if (rows != null) {
      const newSortedRows = sortRows(rows, { ...sortedColumn });
      setSortedRows(newSortedRows);
      console.log('render-layout');
    }
  }, [rows, sortedColumn]);

  function handleSortBy(columnType: ColumnType, columnName: string) {
    const direction = calculateColumnDirection(
      sortedColumn.direction,
      sortedColumn.name,
      columnName
    );
    setSortedColumn({
      name: columnName,
      type: columnType || 'string',
      direction,
    });
  }

  function calculateColumnDirection(
    columnDirection: ColumnDirection,
    oldColumnName: string | null,
    newColumnName: string
  ) {
    if (
      (oldColumnName !== null && oldColumnName !== newColumnName) ||
      columnDirection === 'none'
    ) {
      return 'up';
    } else if (columnDirection === 'up') {
      return 'down';
    } else {
      return 'none';
    }
  }

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
                    aria-label={`Sort by ${columnName} ${sortedColumn.direction}`}
                    onClick={() => handleSortBy(sortedColumn.type, columnName)}
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
                      className={`table__icon table__icon--${
                        sortedColumn.direction
                      } ${
                        sortedColumn.name !== columnName && 'table__icon--none'
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
          <Flipper
            flipKey={sortedRows}
            element="tbody"
            className="table__body"
            // role="alert"
            aria-live={alertActive}
            aria-busy={ariaBusy}
          >
            {rows == null ? (
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
                <Flipped key={row.id} flipId={row.id}>
                  <tr className="table__row list-complete">
                    {Object.entries(columns).map(([columnName, column]) => (
                      <td
                        key={columnName}
                        className={`table__cell ${column.align}`}
                        data-col="columnName"
                      >
                        {rowContent || (
                          <div className="table__cell-inner">
                            {(column.component &&
                              column.component({ ...row })) ||
                              row[columnName]}
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </Flipped>
              ))
            )}
          </Flipper>
        </table>
      </div>
    </div>
  );
}

export default BaseTable;
