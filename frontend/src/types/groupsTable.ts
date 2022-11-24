export interface IColumn {
  id: string;
  label?: string;
  numeric?: boolean;
  canEdit?: boolean;
}

export interface IRow {
  id: string;
  [key: string]: any;
}
