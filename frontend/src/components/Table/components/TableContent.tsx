import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { TableContentProps } from '../../../types/table'

import Row from './Row'


export default function TableContent(props: TableContentProps) {
    const { rows, collapsedRows, columns, collapsedcolumns, rowsPerPage } = props

    if (rows) console.log(rows.map((row) => { return row }))

    const emptyRows = Math.max(0, rowsPerPage - (rows ? rows.length : 0))

    return (
        <TableBody>
            {rows && rows.map((row, index) => {
                return <Row key={index} row={row} collapsedRow={collapsedRows ? collapsedRows[index] : null} columns={columns} collapsedcolumns={collapsedcolumns} />
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