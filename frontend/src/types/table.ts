export interface RowData {
    col1: string
    col2: number
    col3: number
    col4: string
}

export interface HeadCell {
    id: keyof RowData
    label: string
    numeric: boolean
}

export interface CollapsedHeadCell {
    id: keyof CollapsedRowData
    label: string
    numeric: boolean
}

export type Order = 'asc' | 'desc'

export interface TableContentProps {
    rows: Array<RowData>,
    collapsedRows: Array<Array<CollapsedRowData>>,
    columns: Array<HeadCell>,
    rowsPerPage: number
}

export interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof RowData) => void
    order: Order
    orderBy: string
    columns: Array<HeadCell>
}

export interface TableToolbarProps {
    title: string
}

export interface RowProps {
    row: RowData,
    collapsedRow: Array<CollapsedRowData>,
    columns: Array<HeadCell>,
}

export interface CollapsedRowData {
    ccol1: string
    ccol2: string
}

export interface CollapsedTableProps {
    open: boolean,
    rows: Array<CollapsedRowData>,
    parentColumns: Array<HeadCell>
}