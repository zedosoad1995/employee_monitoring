import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableHeader from './components/TableHeader'
import TableContent from './components/TableContent'
import Paper from '@mui/material/Paper'


export default function ({ rows, collapsedRows, columns, total, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, order, orderBy, handleRequestSort }: any) {
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
                    />
                    <TableContent rows={rows} collapsedRows={collapsedRows} columns={columns} rowsPerPage={rowsPerPage} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}
