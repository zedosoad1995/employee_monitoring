import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useEffect, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { RowProps } from '../../../types/table'
import CollapsedTable from './CollapsedTable'
import { TextField } from '@mui/material'

export default function Row(props: RowProps) {
    const { row, columns, collapsedcolumns, collapsedRow, isSaving, finishSaving, editRows, editCollapsedRows } = props

    const [isEditing, setIsEditing] = useState(columns.map(() => false))
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (isSaving) {
            setIsEditing(columns.map(() => false))
            finishSaving()
        }
    }, [isSaving])

    const handleDoubleClick = (index: number) => () => {
        setIsEditing((val) => {
            val[index] = true
            return [...val]
        })
    }

    return (<>
        <TableRow
            hover
            tabIndex={-1}
        >
            {columns.map((col, index) => {
                return <TableCell onDoubleClick={handleDoubleClick(index)} key={index} sx={{ padding: col.isIcon ? "0 0 0 16px" : (isEditing[index] ? "0" : "auto") }} align={col.numeric ? 'right' : 'left'}>
                    {!isEditing[index] && row[col.id]}
                    {isEditing[index] && <TextField
                        id="name"
                        value={row[col.id]}
                        onChange={editRows(col.id)}
                    />}
                </TableCell>
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
        {(collapsedRow && collapsedcolumns) && <CollapsedTable open={open} rows={collapsedRow} parentColumns={columns} columns={collapsedcolumns} isSaving={isSaving} finishSaving={finishSaving} editCollapsedRows={editCollapsedRows} />}
    </>)
}