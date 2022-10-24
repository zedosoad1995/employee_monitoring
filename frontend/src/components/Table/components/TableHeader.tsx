import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { TableHeaderProps } from '../../../types/table'

export default function TableHeader(props: TableHeaderProps) {
    const { order, orderBy, columns, collapsedcolumns, onRequestSort, hiddenCols } = props
    const createSortHandler =
        (property: any) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property)
        }

    const ColumnLabel = (col: any) => {
        if (hiddenCols[col.id]) return <></>

        return <>
            {(col.sortable === undefined || col.sortable) &&
                <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : 'asc'}
                    onClick={createSortHandler(col.id)}
                >
                    {col.label}
                </TableSortLabel>
            }
            {col.sortable === false &&
                <>{col.label}</>
            }
        </>
    }

    return (
        <TableHead sx={{ position: 'sticky', backgroundColor: 'white', zIndex: 100, top: 0 }}>
            <TableRow>
                {columns.map((col) => (
                    <TableCell
                        key={col.id}
                        align={col.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === col.id ? order : false}
                        sx={hiddenCols[col.id] ? { width: 0, padding: 0, margin: 0 } : {}}
                    >
                        {ColumnLabel(col)}
                    </TableCell>
                ))}
                {collapsedcolumns && <TableCell />}
            </TableRow>
        </TableHead>
    )
}