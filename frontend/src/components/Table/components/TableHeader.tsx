import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { RowData, TableHeaderProps } from '../../../types/table'

export default function TableHeader(props: TableHeaderProps) {
    const { order, orderBy, columns, onRequestSort } = props
    const createSortHandler =
        (property: keyof RowData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property)
        }

    return (
        <TableHead>
            <TableRow>
                {columns.map((col) => (
                    <TableCell
                        key={col.id}
                        align={col.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === col.id ? order : false}
                    >
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
                    </TableCell>
                ))}
                <TableCell />
            </TableRow>
        </TableHead>
    )
}