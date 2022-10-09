import { useCallback, useEffect, useState } from "react"
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
import { format, parse } from 'date-fns'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import IconButton from "@mui/material/IconButton"
import FilterListIcon from '@mui/icons-material/FilterList'
import TablePagination from '@mui/material/TablePagination'
import EditIcon from '@mui/icons-material/Edit'
import TimeModal from "./TimeModal"
import SaveIcon from '@mui/icons-material/Save'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Menu, MenuItem } from "@mui/material"


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
        numeric: false,
        isEdit: true
    },
    {
        id: 'endTime',
        label: 'End Time',
        numeric: false,
        isEdit: true
    },
    {
        id: 'duration',
        label: 'Duration',
        numeric: false
    },
    {
        id: 'options',
        label: '',
        numeric: false,
        isIcon: true
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
        numeric: false,
        isEdit: true
    },
    {
        id: 'endTime',
        label: 'End Time',
        numeric: false,
        isEdit: true
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
    const [rows, setRows] = useState<any[] | null>(null)
    const [collapsedRows, setCollapsedRows] = useState<any[] | null>(null)
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [order, setOrder] = useState<Order>('asc')
    const [orderBy, setOrderBy] = useState('overtime')

    const [date, setDate] = useState(new Date())

    const [openEditTime, setOpenEditTime] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState({ id: '', name: '' })

    const [selectedRow, setSelectedRow] = useState<number | undefined>()
    const [editRowNum, setEditRowNum] = useState<number | undefined>()

    const [anchorEl, setAnchorEl] = useState()
    const openMenu = Boolean(anchorEl)

    let dateStr: string
    try {
        dateStr = format(date, 'yyyy-MM-dd')
    } catch (err) {
        dateStr = ''
    }

    const handleClickEditTime = (index: number) => () => {
        setEditRowNum((val) => {
            if (val === index) {
                setSelectedRow(undefined)
                return undefined
            }
            setSelectedRow(index)
            return index
        })

        setRows((r) => {
            if (r) setSelectedEmployee({ id: r[index].employeeId, name: '' })
            return r
        })
    }

    const handleDateChange = (newValue: any) => {
        if (!isNaN(newValue)) setDate(newValue)
        setSelectedEmployee({ id: '', name: '' })
        setSelectedRow(undefined)
        setEditRowNum(undefined)
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: any,
    ) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
        setSelectedEmployee({ id: '', name: '' })
        setSelectedRow(undefined)
        setEditRowNum(undefined)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
        setSelectedEmployee({ id: '', name: '' })
        setSelectedRow(undefined)
        setEditRowNum(undefined)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        setSelectedEmployee({ id: '', name: '' })
        setSelectedRow(undefined)
        setEditRowNum(undefined)
    }

    const getData = async () => {
        const { groups } = await getGroups()

        const { timesheets, total } = await getTimesheets({ page, limit: rowsPerPage, sortBy: orderBy, order, date: dateStr })

        const rows = timesheets.map((ts: any, index: number) => {
            const group = groups.find((g: any) => g.id === ts.group.id)

            return {
                employeeId: ts.employeeId,
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
                            <IconButton onClick={handleClickEditTime(index)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </>
            }
        })
        setRows(rows)

        const collapsedRows = timesheets.map((ts: any, index: number) => {
            console.log(index, ts.breaks)
            return ts.breaks.map((b: any, index2: number) => ({
                id: b.id,
                startTime: b.startTime,
                endTime: b.endTime,
                duration: (!ts.hasMalfunction && b.duration !== '' && b.minsExceeding !== '') ?
                    `${b.duration} (${b.minsExceeding > 0 ? '+' : ''}${b.minsExceeding})` : '',
                isNotAcceptable: b.isNotAcceptable ? <WarningRoundedIcon sx={{ color: "#eed202" }} /> : '',
                options: <IconButton data-row1={`${index}`} data-row2={`${index2}`} onClick={handleMoreClick}><MoreVertIcon /></IconButton>
            }))
        })
        setCollapsedRows(collapsedRows)

        setTotal(total)
    }

    const editRows = (index: number) => (key: string) => (newValue: any, keyboardInputValue: any) => {
        setRows((rows) => {
            if (rows === null) return null
            rows[index][key] = keyboardInputValue ? keyboardInputValue : (newValue ? format(newValue, 'HH:mm') : '')
            return [...rows]
        })
    }

    const editCollapsedRows = (index: number) => (row: number, key: string) => (newValue: any, keyboardInputValue: any) => {
        setCollapsedRows((collapsedRows) => {
            if (collapsedRows === null) return null
            collapsedRows[index][row][key] = keyboardInputValue ? keyboardInputValue : (newValue ? format(newValue, 'HH:mm') : '')
            return [...collapsedRows]
        })
    }

    const handleSave = () => {
        if (selectedRow !== undefined && rows) {
            const data = {
                startTime: rows[selectedRow]['startTime'],
                endTime: rows[selectedRow]['endTime'],
                breaks: collapsedRows ? collapsedRows[selectedRow] : []
            }

            editTimesFromEmployee(selectedEmployee.id, dateStr, data)

            getData()
        }

        setSelectedEmployee({ id: '', name: '' })
        setSelectedRow(undefined)
        setEditRowNum(undefined)
    }

    const handleMoreClick = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(undefined)
    }

    const handleDeleteCollapsedRow = () => {
        if (!anchorEl) return

        // @ts-ignore
        if (selectedRow === undefined) setSelectedRow(Number(anchorEl.getAttribute("data-row1")))

        setCollapsedRows((collapsedRows) => {
            if (collapsedRows === null) return null
            // @ts-ignore
            collapsedRows[anchorEl.getAttribute("data-row1")].splice(anchorEl.getAttribute("data-row2"), 1)

            // @ts-ignore
            for (let i = 0; i < collapsedRows[anchorEl.getAttribute("data-row1")].length; i++) {
                // @ts-ignore
                collapsedRows[anchorEl.getAttribute("data-row1")][`${i}`].options = <IconButton data-row1={anchorEl.getAttribute("data-row1")} data-row2={`${i}`} onClick={handleMoreClick}><MoreVertIcon /></IconButton>
            }

            return [...collapsedRows]
        })

        // @ts-ignore
        if (rows) setSelectedEmployee({ id: rows[Number(anchorEl.getAttribute("data-row1"))].employeeId, name: '' })

        handleCloseMenu()
    }

    const handleAddRow = (isAbove: boolean) => () => {
        if (!anchorEl) return

        // @ts-ignore
        if (selectedRow === undefined) setSelectedRow(Number(anchorEl.getAttribute("data-row1")))

        const newItem = {
            startTime: '',
            endTime: '',
            duration: '',
            isNotAcceptable: '',
            options: <IconButton onClick={handleMoreClick}><MoreVertIcon /></IconButton>
        }

        if (collapsedRows === null) return null
        if (isAbove) {
            // @ts-ignore
            collapsedRows[anchorEl.getAttribute("data-row1")].splice(Number(anchorEl.getAttribute("data-row2")), 0, { ...newItem })
        } else {
            // @ts-ignore
            collapsedRows[anchorEl.getAttribute("data-row1")].splice(Number(anchorEl.getAttribute("data-row2")) + 1, 0, { ...newItem })
        }

        // @ts-ignore
        for (let i = 0; i < collapsedRows[anchorEl.getAttribute("data-row1")].length; i++) {
            // @ts-ignore
            collapsedRows[anchorEl.getAttribute("data-row1")][`${i}`].options = <IconButton data-row1={anchorEl.getAttribute("data-row1")} data-row2={`${i}`} onClick={handleMoreClick}><MoreVertIcon /></IconButton>
        }

        setCollapsedRows([...collapsedRows])

        // @ts-ignore
        if (rows) setSelectedEmployee({ id: rows[Number(anchorEl.getAttribute("data-row1"))].employeeId, name: '' })

        handleCloseMenu()
    }

    const addCollapsedRow = (index: number) => () => {
        if (selectedRow === undefined) setSelectedRow(index)

        if (collapsedRows === null) return null

        const newItem = {
            startTime: '',
            endTime: '',
            duration: '',
            isNotAcceptable: '',
            options: <IconButton data-row1={`${index}`} data-row2={`${collapsedRows[index].length}`} onClick={handleMoreClick}><MoreVertIcon /></IconButton>
        }

        collapsedRows[index].push({ ...newItem })

        setCollapsedRows([...collapsedRows])

        // @ts-ignore
        if (rows) setSelectedEmployee({ id: rows[index].employeeId, name: '' })
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
                <div>
                    <Tooltip title="Save Changes">
                        <IconButton onClick={handleSave} disabled={selectedRow === undefined}>
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            <TimesheetTable
                rows={rows}
                collapsedRows={collapsedRows}
                columns={columns}
                collapsedcolumns={collapsedcolumns}
                order={order}
                orderBy={orderBy}
                handleRequestSort={handleRequestSort}
                editRows={editRows}
                editCollapsedRows={editCollapsedRows}
                editRowNum={editRowNum}
                addCollapsedRow={addCollapsedRow}
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
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleDeleteCollapsedRow}>Delete Row</MenuItem>
                <MenuItem onClick={handleAddRow(true)}>Add Row Above</MenuItem>
                <MenuItem onClick={handleAddRow(false)}>Add Row Below</MenuItem>
            </Menu>
        </>
    );
}

export default Timesheet
