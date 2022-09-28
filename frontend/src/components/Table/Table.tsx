import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableToolbar from './components/TableToolbar'
import TableHeader from './components/TableHeader'
import { HeadCell, Order, RowData } from '../../types/table'
import TableContent from './components/TableContent'
import Paper from '@mui/material/Paper'

const columns: Array<HeadCell> = [
    {
        id: 'col1',
        label: 'col1',
        numeric: false
    },
    {
        id: 'col2',
        label: 'col2',
        numeric: true
    },
    {
        id: 'col3',
        label: 'col3',
        numeric: true
    },
    {
        id: 'col4',
        label: 'col4',
        numeric: false
    }
]

const rows = [
    { col1: 'name1', col2: 1, col3: 1, col4: 'name1' },
    { col1: 'name2', col2: 2, col3: 2, col4: 'name2' },
    { col1: 'name3', col2: 3, col3: 3, col4: 'name3' },
]

const collapsedRows = [
    [
        { ccol1: 'name1', ccol2: 'name1' },
        { ccol1: 'name1', ccol2: 'name1' }
    ],
    [
        { ccol1: 'name1', ccol2: 'name1' },
        { ccol1: 'name1', ccol2: 'name1' },
        { ccol1: 'name1', ccol2: 'name1' },
        { ccol1: 'name1', ccol2: 'name1' }
    ],
    [
    ],
]

export default function () {
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof RowData>('col1')
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
            <TableToolbar title='Title table' />
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}
