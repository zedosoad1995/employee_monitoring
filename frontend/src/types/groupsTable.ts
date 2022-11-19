export interface IColumn {
  id: string;
  label?: string;
  numeric?: boolean;
  isHidden?: boolean;
}

export interface IRow {
  [key: string]: any;
}
