export interface HeadCell {
    id: string
    label: string
    numeric: boolean,
    sortable?: boolean,
    isIcon?: boolean
}

export interface CollapsedHeadCell {
    id: string
    label: string
    numeric: boolean
    isIcon?: boolean
}

export type Order = 'asc' | 'desc'

export interface TableContentProps {
    rows: Array<any>,
    collapsedRows: Array<Array<any>>,
    columns: Array<HeadCell>,
    collapsedcolumns: Array<CollapsedHeadCell>
    rowsPerPage: number,
    isSaving?: boolean,
    finishSaving?: any
    editRows: any
    editCollapsedRows: any
}

export interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void
    order: Order
    orderBy: string
    columns: Array<HeadCell>,
    collapsedcolumns: Array<CollapsedHeadCell>
}

export interface TableToolbarProps {
    title: string
}

export interface RowProps {
    row: any,
    collapsedRow: Array<any> | null,
    columns: Array<HeadCell>,
    collapsedcolumns: Array<CollapsedHeadCell>,
    isSaving?: boolean,
    finishSaving?: any,
    editRows: any
    editCollapsedRows: any
}


export interface CollapsedTableProps {
    open: boolean,
    rows: Array<any>,
    parentColumns: Array<HeadCell>
    columns: Array<CollapsedHeadCell>
    isSaving?: boolean
    finishSaving?: any
    editCollapsedRows: any
}