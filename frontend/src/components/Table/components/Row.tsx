import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { RowProps } from '../../../types/table'
import CollapsedTable from './CollapsedTable'

export default function Row(props: RowProps) {
    const { row, columns, collapsedcolumns, collapsedRow } = props

    const [open, setOpen] = useState(false)

    return (<>
        <TableRow
            hover
            tabIndex={-1}
        >
            {columns.map((col, index) => {
                return <TableCell key={index} sx={{ padding: col.isIcon ? "0 0 0 16px" : "auto" }} align={col.numeric ? 'right' : 'left'}>{row[col.id]}</TableCell>
            })}
            {(collapsedRow && collapsedcolumns) &&
                <TableCell >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
            }
        </TableRow>
        {(collapsedRow && collapsedcolumns) && <CollapsedTable open={open} rows={collapsedRow} parentColumns={columns} columns={collapsedcolumns} />}
    </>)
}