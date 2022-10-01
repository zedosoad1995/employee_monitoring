import { useEffect, useState } from "react";
import { getTimeStrFromMins } from "../../helpers/dateTime";
import { getTimesheets } from "../../services/timesheet";
import { HeadCell, Order, RowData } from "../../types/table";
import UsersTable from "../Table/Table"

const columns: Array<HeadCell> = [
    {
        id: 'name',
        label: 'Employee',
        numeric: false
    },
    {
        id: 'group',
        label: 'Group',
        numeric: false
    },
    {
        id: 'overtime',
        label: 'Overtime',
        numeric: false
    },
    {
        id: 'timeLate',
        label: 'Time Late',
        numeric: false
    },
    {
        id: 'startTime',
        label: 'Start Time',
        numeric: false
    },
    {
        id: 'endTime',
        label: 'End Time',
        numeric: false
    },
    {
        id: 'hasNonAcceptableBreaks',
        label: '',
        numeric: false
    }
]


function Home() {
    const [rows, setRows] = useState(null)
    const [collapsedRows, setCollapsedRows] = useState(null)
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState<keyof RowData>('overtime')

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

    useEffect(() => {
        const getData = async () => {
            const { timesheets, total } = await getTimesheets({ page, limit: rowsPerPage, sortBy: orderBy, order })

            const rows = timesheets.map((ts: any) => ({
                name: ts.name,
                group: ts.group,
                overtime: getTimeStrFromMins(ts.overtime),
                timeLate: getTimeStrFromMins(ts.timeLate),
                startTime: ts.startTime,
                endTime: ts.endTime
            }))
            setRows(rows)

            const collapsedRows = timesheets.map((ts: any) => {
                return ts.breaks.map((b: any) => ({
                    startTime: b.startTime,
                    endTime: b.endTime,
                    duration: `${b.duration} (${b.minsExceeding > 0 ? '+' : ''}${b.minsExceeding})`,
                    isNotAcceptable: b.isNotAcceptable
                }))
            })
            setCollapsedRows(collapsedRows)

            setTotal(total)
        }

        getData()
    }, [page, rowsPerPage, orderBy, order])

    return (
        <UsersTable
            rows={rows}
            collapsedRows={collapsedRows}
            columns={columns}
            total={total}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            order={order}
            orderBy={orderBy}
            handleRequestSort={handleRequestSort}
        />
    );
}

export default Home
