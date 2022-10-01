import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableToolbar from './components/TableToolbar'
import TableHeader from './components/TableHeader'
import { HeadCell, Order, RowData } from '../../types/table'
import TableContent from './components/TableContent'
import Paper from '@mui/material/Paper'


export default function ({ rows, collapsedRows, columns, total }: any) {
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof RowData>('name')
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof RowData,
    ) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <>
            <TableToolbar title='Timesheets' />
            <TableContainer component={Paper}>
                <Table
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
