import { ColumnState, ColumnType, Row } from '../types/table';

export function sortRows(
  rows: Row[],
  column: {
    name: string;
    type: ColumnType;
  },
  columnState: ColumnState
) {
  if (column.type == null || column.type === 'string') {
    return sortRowsByCol(rows, column.name, columnState);
  }
  return null;
}

export function sortRowsByCol(
  rows: Row[],
  columnName: string,
  columnState: ColumnState
) {
  if (columnState === 'up') {
    return [...rows].sort((a, b) =>
      a[columnName] < b[columnName]
        ? -1
        : a[columnName] === b[columnName]
        ? 0
        : 1
    );
  } else if (columnState === 'down') {
    return [...rows].sort((a, b) =>
      a[columnName] > b[columnName]
        ? -1
        : a[columnName] === b[columnName]
        ? 0
        : 1
    );
  } else {
    return [...rows];
  }
}
