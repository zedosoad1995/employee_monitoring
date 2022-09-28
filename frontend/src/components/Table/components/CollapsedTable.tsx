import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { CollapsedTableProps, CollapsedHeadCell } from '../../../types/table'


const columns: Array<CollapsedHeadCell> = [
    {
        id: 'ccol1',
        label: 'ccol1',
        numeric: false
    },
    {
        id: 'ccol2',
        label: 'ccol2',
        numeric: false
    }
]

export default function CollapsedTable(props: CollapsedTableProps) {
    const { open, rows, parentColumns } = props

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={parentColumns.length + 1} >
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    {columns.map(col => (
                                        <TableCell
                                            key={col.id}
                                            align={col.numeric ? 'right' : 'left'}
                                        >
                                            {col.label}
                                        </TableCell>
                                    ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow>
                                        {columns.map(col => (
                                            <TableCell
                                                align={col.numeric ? 'right' : 'left'}
                                            >
                                                {row[col.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    )
}