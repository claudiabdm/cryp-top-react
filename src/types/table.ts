import { ReactElement } from "react";


export type ColumnType = 'number' | 'string' | 'date' | null;
export type ColumnDirection = 'up' | 'down' | 'none';
export interface Column {
  name: string;
  align: 'center' | 'left' | 'right';
  type?: ColumnType | 'string';
  component?: (data: any) => ReactElement<any> | string | number;
}

export interface Row {
  [key: string]: any;
  id: string | number;
} 
