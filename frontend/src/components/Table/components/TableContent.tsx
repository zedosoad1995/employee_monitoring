import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { TableContentProps } from '../../../types/table'

import Row from './Row'


export default function TableContent(props: TableContentProps) {
    const { rows, collapsedRows, columns, collapsedcolumns, rowsPerPage, editRows, editCollapsedRows, editRowNum, addCollapsedRow } = props

    const emptyRows = Math.max(0, rowsPerPage - (rows ? rows.length : 0))

    return (
        <TableBody>
            {rows && rows.map((row, index) => {
                return <Row key={index} row={row} collapsedRow={collapsedRows ? collapsedRows[index] : null} columns={columns} collapsedcolumns={collapsedcolumns} editRows={editRows(index)} editCollapsedRows={editCollapsedRows(index)} isEditing={editRowNum === index} addCollapsedRow={addCollapsedRow(index)} />
            })}
            {/* {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: 47 * emptyRows,
                    }}
                >
                    <TableCell colSpan={columns.length + 1} />
                </TableRow>
            )} */}
        </TableBody>
    )
}