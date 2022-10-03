import { useEffect, useState } from "react"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { getGroups } from "../../services/group"
import { HeadCell } from "../../types/table"
import GroupsTable from "../Table/Table"
import AddIcon from '@mui/icons-material/Add'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import TextField from "@mui/material/TextField"
import { Button, DialogActions, DialogContentText, Divider, Grid, Paper, Stack, Typography } from "@mui/material"
import { DialogContent } from '@mui/material'
import Box from "@mui/system/Box"
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import DeleteIcon from '@mui/icons-material/Delete'


const columns: Array<HeadCell> = [
    {
        id: 'name',
        label: 'Name',
        numeric: false,
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
    }
]


function Groups() {
    const [rows, setRows] = useState(null)
    const [openCreateGroup, setOpenCreateGroup] = useState(false)

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [breaks, setBreaks] = useState<Array<{ startTime: any, endTime: any }>>([])

    const handleChangeStartBreak = (index: number) => (newValue: any) => {
        setBreaks((b: any) => {
            b[index].startTime = newValue
            return b
        })
    }

    const handleChangeEndBreak = (index: number) => (newValue: any) => {
        setBreaks((b: any) => {
            b[index].endTime = newValue
            return b
        })
    }

    const handleClickAddNewBreak = () => {
        setBreaks((b: any) => [
            ...b,
            { startTime: new Date(), endTime: new Date() }
        ])
    }

    const handleClickRemoveBreak = (index: number) => () => {
        setBreaks((b: any) => b.filter((val: any, i: number) => i !== index))
    }

    const handleChangeStartDate = (newValue: any) => {
        setStartDate(newValue)
    }

    const handleChangeEndDate = (newValue: any) => {
        setEndDate(newValue)
    }

    const handleClickAddGroup = () => {
        setOpenCreateGroup(true)
    }

    const handleCloseAddGroup = () => {
        setOpenCreateGroup(false)
    }

    useEffect(() => {
        const getData = async () => {
            const { groups } = await getGroups()
            const rows = groups.map((g: any) => ({
                name: g.name,
                startTime: g.startTime,
                endTime: g.endTime
            }))
            setRows(rows)
        }

        getData()
    }, [])

    return (
        <>
            <div style={{ marginBottom: "10px", marginTop: "10px", display: "flex", justifyContent: "end" }}>
                <Tooltip title="Create Employee">
                    <IconButton>
                        <AddIcon onClick={handleClickAddGroup} />
                    </IconButton>
                </Tooltip>
            </div>
            <GroupsTable
                rows={rows}
                columns={columns}
            />
            <Dialog fullWidth onClose={handleCloseAddGroup} open={openCreateGroup}>
                <DialogTitle>Create New Group</DialogTitle>
                <DialogContent sx={{ mt: 1, maxWidth: "600px" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Box sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TimePicker
                                        label="Start Time"
                                        value={startDate}
                                        onChange={handleChangeStartDate}
                                        renderInput={(params) => <TextField fullWidth id="startTime" {...params} />}
                                        ampm={false}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TimePicker
                                        label="End Time"
                                        value={endDate}
                                        onChange={handleChangeEndDate}
                                        renderInput={(params) => <TextField fullWidth id="endTime" {...params} />}
                                        ampm={false}
                                    />
                                </Grid>
                            </Grid>
                            <Divider sx={{ mt: 2, mb: 2 }} />
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                                <Typography sx={{ mt: "auto", mb: "auto" }}>Breaks</Typography>
                                <Tooltip title="Add Break">
                                    <IconButton onClick={handleClickAddNewBreak}>
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <Stack spacing={2}>
                                {breaks.map((b, index) => (
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <TimePicker
                                            label="Break Start"
                                            value={b.startTime}
                                            onChange={handleChangeStartBreak(index)}
                                            renderInput={(params) => <TextField fullWidth id="breakStart" {...params} />}
                                            ampm={false}
                                        />
                                        <TimePicker
                                            label="Break End"
                                            value={b.endTime}
                                            onChange={handleChangeEndBreak(index)}
                                            renderInput={(params) => <TextField fullWidth id="breakEnd" {...params} />}
                                            ampm={false}
                                        />
                                        <IconButton onClick={handleClickRemoveBreak(index)} sx={{ height: "fit-content" }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                            </Stack>

                        </Box>
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions >
                    <Button>Create</Button>
                    <Button onClick={handleCloseAddGroup}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Groups
