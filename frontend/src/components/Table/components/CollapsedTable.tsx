import { Typography } from '@mui/material'
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
        id: 'isNotAcceptable',
        label: '',
        numeric: false,
        isIcon: true
    },
    {
        id: 'startTime',
        label: 'Start Time',
        numeric: false
    },
    {
        id: 'endTime',
        label: 'End Time',
        numeric: false
    },
    {
        id: 'duration',
        label: 'Duration',
        numeric: false
    }
]

export default function CollapsedTable(props: CollapsedTableProps) {
    const { open, rows, parentColumns } = props

    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottomWidth: open ? "1px" : 0 }} colSpan={parentColumns.length} >
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 2 }}>
                        <Typography>Breaks</Typography>
                        <Table size="small" sx={{ width: "auto" }}>
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
                                                sx={{ padding: col.isIcon ? "0 0 0 6px" : "auto" }}
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