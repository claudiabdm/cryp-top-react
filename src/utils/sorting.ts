import { ColumnDirection, ColumnType, Row } from '../types/table';

export function sortRows(
  rows: Row[],
  sortedColumn: {
    name: string | null;
    type: ColumnType;
    direction: ColumnDirection;
  }
) {
  if (
    sortedColumn.name != null &&
    (sortedColumn.type == null || sortedColumn.type === 'string')
  ) {
    return sortRowsByCol(rows, sortedColumn.name, sortedColumn.direction);
  }
  return rows;
}

export function sortRowsByCol(
  rows: Row[],
  columnName: string,
  columnDirection: ColumnDirection
) {
  if (columnDirection === 'up') {
    return [...rows].sort((a, b) =>
      a[columnName] < b[columnName]
        ? -1
        : a[columnName] === b[columnName]
        ? 0
        : 1
    );
  } else if (columnDirection === 'down') {
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
