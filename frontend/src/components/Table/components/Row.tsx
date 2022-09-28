import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { RowProps } from '../../../types/table'
import CollapsedTable from './CollapsedTable'

export default function Row(props: RowProps) {
    const { row, columns, collapsedRow } = props

    const [open, setOpen] = useState(false)

    return (<>
        <TableRow
            hover
            tabIndex={-1}
        >
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            {columns.map(col => {
                return <TableCell align={col.numeric ? 'right' : 'left'}>{row[col.id]}</TableCell>
            })}
        </TableRow>
        <CollapsedTable open={open} rows={collapsedRow} parentColumns={columns} />
    </>)
}