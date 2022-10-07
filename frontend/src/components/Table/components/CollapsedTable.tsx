import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { CollapsedTableProps } from '../../../types/table'


export default function CollapsedTable(props: CollapsedTableProps) {
    const { open, rows, parentColumns, columns } = props

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
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        {columns.map((col, index2) => (
                                            <TableCell
                                                key={`${index}-${index2}`}
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