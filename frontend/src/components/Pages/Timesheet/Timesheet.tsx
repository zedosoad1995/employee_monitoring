import { useCallback, useEffect, useState } from "react"
import { dateToStr, getTimeStrFromMins } from "../../../helpers/dateTime"
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
import SaveIcon from '@mui/icons-material/Save'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { FormControl, InputLabel, Menu, MenuItem, Select } from "@mui/material"
import { getEmployeesShort } from "../../../services/employees"
import FilterSelectList from "./FilterSelectList"


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
        numeric: false,
        isLink: true,
        canBeHidden: true
    },
    {
        id: 'date',
        label: 'Date',
        numeric: false,
        canBeHidden: true
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

const filters = [
    {
        id: 'employees',
        filterId: 'employeeId',
        label: 'Employee',
        getData: getEmployeesShort
    },
    {
        id: 'groups',
        filterId: 'groupId',
        label: 'Group',
        getData: getGroups
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

    const [date, setDate] = useState<any>(new Date())

    const [selectedEmployee, setSelectedEmployee] = useState({ id: '', name: '' })

    const [selectedRow, setSelectedRow] = useState<number | undefined>()
    const [editRowNum, setEditRowNum] = useState<number | undefined>()

    const [anchorEl, setAnchorEl] = useState()
    const openMenu = Boolean(anchorEl)
    const [anchorElFilter, setAnchorElFilter] = useState()
    const openFilterMenu = Boolean(anchorElFilter)

    const [displayedFilters, setDisplayedFilters] = useState<Array<any>>([])
    const [listedFilters, setListedFilters] = useState<Array<any>>([])

    const [selectedFilters, setSelectedFilters] = useState<any>({ date: dateToStr(new Date()) })

    const [isDateFilterDisabled, setIsDateFilterDisabled] = useState(false)

    const [hiddenCols, setHiddenCols] = useState({ name: false, date: true })


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

        const { timesheets, total } = await getTimesheets({ page, limit: rowsPerPage, sortBy: orderBy, order, ...selectedFilters })

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
                overtime: ts.overtime !== null ? getTimeStrFromMins(ts.overtime) : '',
                timeLate: ts.timeLate !== null ? getTimeStrFromMins(ts.timeLate) : '',
                startTime: ts.startTime,
                endTime: ts.endTime,
                date: ts.date,
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

    const handleSave = async () => {
        if (selectedRow !== undefined && rows) {
            const data = {
                startTime: rows[selectedRow]['startTime'],
                endTime: rows[selectedRow]['endTime'],
                breaks: collapsedRows ? collapsedRows[selectedRow].map((el: any) => ({ startTime: el.startTime, endTime: el.endTime })) : []
            }

            await editTimesFromEmployee(selectedEmployee.id, dateToStr(date), data)

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

    const handleFilterClick = (e: any) => {
        setAnchorElFilter(e.currentTarget)
    }

    const handleCloseFilterMenu = () => {
        setAnchorElFilter(undefined)
    }

    const handleClickListedFilter = (id: string) => () => {
        const currFilter = filters.find((f) => f.id === id)
        setDisplayedFilters((f) => [...f, currFilter])
        setListedFilters((f) => f.filter((val) => val.id !== id))
    }

    const handleClickClearFilters = () => {
        setHiddenCols({ name: false, date: true })
        setIsDateFilterDisabled(false)
        setDisplayedFilters([])
        setListedFilters(filters)
        setSelectedFilters({ date: dateToStr(date) })
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

    const editFilter = (key: string) => (value: string) => {
        if (key === 'employeeId' && 'date' in selectedFilters) {
            setSelectedFilters((f: any) => {
                const { date, ...otherFilters } = f
                otherFilters[key] = value
                return { ...otherFilters }
            })
            setIsDateFilterDisabled(true)
            setHiddenCols({ name: true, date: false })
            setOrderBy('date')
            setOrder('desc')
        } else {
            setSelectedFilters((f: any) => {
                f[key] = value
                return { ...f }
            })
        }
    }

    useEffect(() => {
        setListedFilters(filters)
    }, [])

    useEffect(() => {
        setSelectedFilters((f: any) => ({ ...f, date: dateToStr(date) }))
    }, [date])

    useEffect(() => {
        getData()
    }, [page, rowsPerPage, orderBy, order, selectedFilters])

    return (
        <>
            <div style={{ marginBottom: "10px", marginTop: "10px", display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            disabled={isDateFilterDisabled}
                            label="Date"
                            inputFormat="yyyy-MM-dd"
                            value={!isDateFilterDisabled ? date : null}
                            onChange={handleDateChange}
                            renderInput={({ error, onError, ...params }) => <TextField sx={{ minWidth: "150px" }} {...params} />}
                            disableFuture={true}
                        />
                    </LocalizationProvider>
                    {displayedFilters.map((e: any) => (<FilterSelectList id={e.id} label={e.label} getData={e.getData} editFilter={editFilter(e.filterId)} />))}
                </div>
                <div style={{ flexGrow: 1 }} />
                <div>
                    <Tooltip title="Save Changes">
                        <IconButton onClick={handleSave} disabled={selectedRow === undefined}>
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter table">
                        <IconButton onClick={handleFilterClick}>
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
                hiddenCols={hiddenCols}
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
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleDeleteCollapsedRow}>Delete Row</MenuItem>
                <MenuItem onClick={handleAddRow(true)}>Add Row Above</MenuItem>
                <MenuItem onClick={handleAddRow(false)}>Add Row Below</MenuItem>
            </Menu>
            <Menu
                anchorEl={anchorElFilter}
                open={openFilterMenu}
                onClose={handleCloseFilterMenu}
            >
                {listedFilters.map((f) => (<MenuItem onClick={handleClickListedFilter(f.id)}>{f.label}</MenuItem>))}
                <MenuItem onClick={handleClickClearFilters}>Clear Filters</MenuItem>
            </Menu>
        </>
    );
}

export default Timesheet
