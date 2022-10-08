import { useEffect, useState } from "react"
import { getTimeStrFromMins } from "../../../helpers/dateTime"
import { editTimesFromEmployee, getTimesheetRaw, getTimesheets } from "../../../services/timesheet"
import { CollapsedHeadCell, HeadCell, Order } from "../../../types/table"
import TimesheetTable from "../../Table/Table"
import WarningRoundedIcon from '@mui/icons-material/WarningRounded'
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import { getGroups } from "../../../services/group"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import TextField from "@mui/material/TextField"
import { format } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import IconButton from "@mui/material/IconButton"
import FilterListIcon from '@mui/icons-material/FilterList'
import TablePagination from '@mui/material/TablePagination'
import EditIcon from '@mui/icons-material/Edit'
import TimeModal from "./TimeModal"


const collapsedcolumns: Array<CollapsedHeadCell> = [
    {
        id: 'isNotAcceptable',
        label: '',
        numeric: false,
        isIcon: true
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
        id: 'duration',
        label: 'Duration',
        numeric: false
    }
]

const columns: Array<HeadCell> = [
    {
        id: 'hasNonAcceptableBreaks',
        label: '',
        numeric: false,
        sortable: false,
        isIcon: true
    },
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
        id: 'edit',
        label: '',
        numeric: false,
        sortable: false,
        isIcon: true
    }
]


function Timesheet() {
    const [rows, setRows] = useState(null)
    const [collapsedRows, setCollapsedRows] = useState(null)
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState('overtime')

    const [date, setDate] = useState(new Date())

    const [openEditTime, setOpenEditTime] = useState(false)
    const [times, setTimes] = useState<Array<{ time: Date, isEnter: boolean }>>([])
    const [selectedEmployee, setSelectedEmployee] = useState({ id: '', name: '' })

    let dateStr: string
    try {
        dateStr = format(date, 'yyyy-MM-dd')
    } catch (err) {
        dateStr = ''
    }

    const handleClickEditTime = (employeeId: string) => async () => {
        const times = (await getTimesheetRaw({ employeeId, date: dateStr })).timesheets

        if (times.length === 0) return

        setTimes((t: any) => [
            ...t,
            ...times.map((val: any) => ({ time: new Date(`2019-02-11T${val.time}`), isEnter: val.isEnter }))
        ])

        setSelectedEmployee(times[0].employee)

        setOpenEditTime(true)
    }

    const handleCloseEditTime = () => {
        getData()
        setTimes([])
        setSelectedEmployee({ id: '', name: '' })
        setOpenEditTime(false)
    }

    const handleDateChange = (newValue: any) => {
        if (!isNaN(newValue)) setDate(newValue)
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: any,
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

    const getData = async () => {
        const { groups } = await getGroups()

        const { timesheets, total } = await getTimesheets({ page, limit: rowsPerPage, sortBy: orderBy, order, date: dateStr })

        const rows = timesheets.map((ts: any, index: number) => {
            const group = groups.find((g: any) => g.id === ts.group.id)

            return {
                hasNonAcceptableBreaks: ts.hasNonAcceptableBreaks || ts.hasMalfunction ? <WarningRoundedIcon sx={{ color: "#eed202" }} /> : '',
                name: ts.name,
                group: <>
                    {group &&
                        <Tooltip
                            key={index}
                            title={<>
                                <Typography color="inherit">Schedule</Typography>
                                <p>{`Enter: ${group.startTime}`}</p>
                                {group.Break.map((b: any) =>
                                    (<p>{`Break: ${b.startTime} - ${b.endTime}`}</p>)
                                )}
                                <p>{`Leave: ${group.endTime}`}</p>
                            </>}
                        >
                            <div style={{ cursor: "pointer" }}>{ts.group.name}</div>
                        </Tooltip>
                    }
                </>,
                overtime: ts.overtime ? getTimeStrFromMins(ts.overtime) : '',
                timeLate: ts.timeLate ? getTimeStrFromMins(ts.timeLate) : '',
                startTime: ts.startTime,
                endTime: ts.endTime,
                edit: <>
                    {group &&
                        <Tooltip
                            key={index}
                            title="Edit Times"
                        >
                            <IconButton onClick={handleClickEditTime(ts.employeeId)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </>
            }
        })
        setRows(rows)

        const collapsedRows = timesheets.map((ts: any) => {
            return ts.breaks.map((b: any) => ({
                startTime: b.startTime,
                endTime: b.endTime,
                duration: (!ts.hasMalfunction && b.duration !== '' && b.minsExceeding !== '') ?
                    `${b.duration} (${b.minsExceeding > 0 ? '+' : ''}${b.minsExceeding})` : '',
                isNotAcceptable: b.isNotAcceptable ? <WarningRoundedIcon sx={{ color: "#eed202" }} /> : ''
            }))
        })
        setCollapsedRows(collapsedRows)

        setTotal(total)
    }

    useEffect(() => {
        getData()
    }, [page, rowsPerPage, orderBy, order, date])


    return (
        <>
            <div style={{ marginBottom: "10px", marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date"
                        inputFormat="yyyy-MM-dd"
                        value={date}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        disableFuture={true}
                    />
                </LocalizationProvider>
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            </div>

            <TimesheetTable
                rows={rows}
                collapsedRows={collapsedRows}
                columns={columns}
                collapsedcolumns={collapsedcolumns}
                order={order}
                orderBy={orderBy}
                handleRequestSort={handleRequestSort}
            />
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <TimeModal
                timesObj={times}
                handleClose={handleCloseEditTime}
                open={openEditTime}
                employee={selectedEmployee}
                dateStr={dateStr}
            />
        </>
    );
}

export default Timesheet
