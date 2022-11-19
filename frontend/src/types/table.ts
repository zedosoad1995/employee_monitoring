export interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
  sortable?: boolean;
  isIcon?: boolean;
  isEdit?: boolean;
  isLink?: boolean;
  canBeHidden?: boolean;
  filterId?: string;
}

export interface CollapsedHeadCell {
  id: string;
  label: string;
  numeric: boolean;
  isIcon?: boolean;
  isEdit?: boolean;
}

export type Order = "asc" | "desc";

export interface TableContentProps {
  rows: Array<any>;
  collapsedRows: Array<Array<any>>;
  columns: Array<HeadCell>;
  collapsedcolumns: Array<CollapsedHeadCell>;
  rowsPerPage: number;
  editRows: any;
  editCollapsedRows: any;
  editRowNum?: number;
  addCollapsedRow?: any;
  hiddenCols: any;
  onClickRow?: (id: string) => () => void;
}

export interface TableHeaderProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
  columns: Array<HeadCell>;
  collapsedcolumns: Array<CollapsedHeadCell>;
  hiddenCols: any;
}

export interface TableToolbarProps {
  title: string;
}

export interface RowProps {
  row: any;
  collapsedRow: Array<any> | null;
  columns: Array<HeadCell>;
  collapsedcolumns: Array<CollapsedHeadCell>;
  editRows: any;
  editCollapsedRows: any;
  isEditing: boolean;
  addCollapsedRow: any;
  hiddenCols: any;
  onClickRow?: () => void;
}

export interface CollapsedTableProps {
  open: boolean;
  rows: Array<any>;
  parentColumns: Array<HeadCell>;
  columns: Array<CollapsedHeadCell>;
  editCollapsedRows: any;
  isEditing?: boolean;
  addRow?: any;
}
