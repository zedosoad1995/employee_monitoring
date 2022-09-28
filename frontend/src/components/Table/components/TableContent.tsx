import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { TableContentProps } from '../../../types/table'

import Row from './Row'


export default function TableContent(props: TableContentProps) {
    const { rows, collapsedRows, columns, rowsPerPage } = props

    const emptyRows = Math.max(0, rowsPerPage - rows.length)

    return (
        <TableBody>
            {rows.map((row, index) => {
                return <Row key={index} row={row} collapsedRow={collapsedRows[index]} columns={columns} />
            })}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: 33 * emptyRows,
                    }}
                >
                    <TableCell colSpan={columns.length + 1} />
                </TableRow>
            )}
        </TableBody>
    )
}