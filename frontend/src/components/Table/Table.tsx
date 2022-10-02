import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHeader from './components/TableHeader'
import TableContent from './components/TableContent'
import Paper from '@mui/material/Paper'


export default function ({ rows, collapsedRows, columns, collapsedcolumns, rowsPerPage, order, orderBy, handleRequestSort }: any) {
    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    sx={{ width: "100%" }}
                    aria-labelledby="tableTitle"
                    size='small'
                >
                    <TableHeader
                        order={order}
                        orderBy={orderBy}
                        columns={columns}
                        onRequestSort={handleRequestSort}
                        collapsedcolumns={collapsedcolumns}
                    />
                    <TableContent rows={rows} collapsedRows={collapsedRows} columns={columns} collapsedcolumns={collapsedcolumns} rowsPerPage={rowsPerPage} />
                </Table>
            </TableContainer>
        </>
    )
}
