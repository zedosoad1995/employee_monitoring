export enum CellType {
  TIME = "time",
  SELECT = "select",
}

export interface IColumn {
  id: string;
  label?: string;
  numeric?: boolean;
  canEdit?: boolean;
  type?: CellType;
}

export interface IRow {
  id: string;
  [key: string]: any;
}
