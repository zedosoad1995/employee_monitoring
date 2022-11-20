export interface IColumn {
  id: string;
  label?: string;
  numeric?: boolean;
}

export interface IRow {
  id: string;
  [key: string]: any;
}
