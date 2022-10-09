import { IconButton, TextField, Tooltip, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { CollapsedTableProps } from '../../../types/table'
import AddIcon from '@mui/icons-material/Add'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { parse } from 'date-fns'


export default function CollapsedTable(props: CollapsedTableProps) {
    const { open, rows, parentColumns, columns, editCollapsedRows, isEditing, addRow } = props


    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottomWidth: open ? "1px" : 0 }} colSpan={parentColumns.length + 1} >
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 2 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography>Breaks</Typography>
                            <Tooltip
                                title="Add Row"
                            >
                                <IconButton onClick={addRow}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <Table size="small" sx={{ width: "500px" }}>
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
                                    <TableRow key={row.id}>
                                        {columns.map((col, index2) => {
                                            return <TableCell
                                                key={`${row.id}-${index2}`}
                                                sx={{ padding: col.isIcon ? "0 0 0 6px" : ((isEditing !== undefined && !isEditing) ? "auto" : "auto") }}
                                                /* sx={{ padding: col.isIcon ? "0 0 0 6px" : "auto" }} */
                                                align={col.numeric ? 'right' : 'left'}
                                            >
                                                {(!isEditing || !col.isEdit) && row[col.id]}
                                                {(isEditing && col.isEdit) &&
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <TimePicker
                                                            value={parse(row[col.id], "HH:mm", new Date())}
                                                            onChange={editCollapsedRows(index, col.id)}
                                                            renderInput={(params) => {
                                                                return <TextField
                                                                    id="name"
                                                                    sx={{ '& .MuiInputBase-root': { fontSize: 'inherit' } }}
                                                                    size='small'
                                                                    {...params}
                                                                />
                                                            }}
                                                            ampm={false}
                                                        />
                                                    </LocalizationProvider>
                                                }
                                            </TableCell>
                                        })}
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