import { useEffect, useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Stack from "@mui/material/Stack"
import { TimePicker } from "@mui/x-date-pickers/TimePicker"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from "@mui/material/TextField"

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

import AddIcon from '@mui/icons-material/Add'
import Divider from "@mui/material/Divider"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { Checkbox, FormControlLabel } from "@mui/material"
import { format } from "date-fns"
import { editTimesFromEmployee } from "../../../services/timesheet"


const schema = yup.object().shape({
    times: yup.array().of(
        yup.object().shape({
            time: yup
                .date()
                .typeError('Invalid Date')
                .required(),
            isEnter: yup
                .boolean()
                .required(),
        })
    ).max(20, 'Cannot exceed 20 rows')
})


function TimeModal({ timesObj, handleClose, open, employee, dateStr }:
    { timesObj: Array<{ time: Date, isEnter: boolean }>, handleClose: any, open: any, employee: any, dateStr: string }) {

    const [times, setTimes] = useState<Array<{ time: Date, isEnter: boolean }>>([])

    useEffect(() => {
        setValue('times', timesObj)
        setTimes(timesObj)
    }, [open])


    const { register, control, handleSubmit, formState: { errors }, setValue, getValues } =
        useForm<{ times: Array<{ time: Date, isEnter: boolean }> }>({
            resolver: yupResolver(schema),
            mode: 'onSubmit'
        })

    const handleChangeTime = (index: number) => (newValue: any, keyboardInputValue: any) => {
        const newTime = (keyboardInputValue && keyboardInputValue.length !== 5) ?
            new Date("") :
            newValue

        setTimes((t: any) => {
            t[index].time = newTime
            setValue('times', t)
            return [...t]
        })
    }

    const handleAddTime = (index: number) => () => {
        let newTime = new Date()

        if (times.length > 0) {
            newTime = index >= times.length ?
                new Date(`2019-02-11T${format(times[index - 1].time, "HH:mm")}`) :
                new Date(`2019-02-11T${format(times[index].time, "HH:mm")}`)
        }

        setTimes((t: any) => {
            t.splice(index, 0, { time: newTime, isEnter: false })
            setValue('times', t)
            return [...t]
        })
    }

    const handleRemoveTime = (index: number) => () => {
        setTimes((t: any) => {
            const ret = t.filter((val: any, i: number) => i !== index)
            setValue('times', ret)
            return ret
        })
    }

    const prepareSubmit = async ({ times }: any) => {
        await editTimesFromEmployee(employee.id, dateStr, times.map((t: any) => ({ isEnter: t.isEnter, time: format(t.time, 'HH:mm') })))
        handleClose()
    }

    return (
        <Dialog fullWidth onClose={handleClose} open={open}>
            <div style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.6, letterSpacing: '0.0075em' }}>
                    Edit Times: {employee.name}
                </div>
                <div style={{ color: "red", fontSize: 'small' }}>{errors.times?.message}</div>
            </div>
            <DialogContent sx={{ maxWidth: "600px", paddingTop: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form id="timesForm" onSubmit={handleSubmit(prepareSubmit)} noValidate>
                        <Stack sx={{ mt: 1 }} spacing={2}>
                            <div style={{ display: "flex", justifyContent: "space-between", height: 10, alignItems: "center" }} >
                                <Divider sx={{ flex: 1, height: 0, margin: 'auto', marginRight: '5px' }} />
                                <Tooltip title="Add Time">
                                    <div style={{ width: "40px", height: "40px" }}>
                                        <IconButton onClick={handleAddTime(0)} >
                                            <AddIcon />
                                        </IconButton>
                                    </div>
                                </Tooltip>
                            </div>
                            {times.map((t, index) => {
                                return <>
                                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <Controller
                                            control={control}
                                            name={`times.${index}.time`}
                                            defaultValue={t.time}
                                            render={() => {
                                                return <TimePicker
                                                    label="Start Time"
                                                    value={t.time}
                                                    onChange={handleChangeTime(index)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            id={`startTime${index}`}
                                                            fullWidth
                                                            required
                                                            helperText={<>{(errors.times) && errors.times[index]?.time?.message}</>}
                                                            {...params}
                                                        />
                                                    )}
                                                    ampm={false}
                                                />
                                            }}
                                        />

                                        <Controller
                                            name={`times.${index}.isEnter`}
                                            control={control}
                                            render={({ field: props }) => (
                                                <FormControlLabel control={
                                                    <Checkbox
                                                        {...props}
                                                        checked={props.value}
                                                        onChange={(e) => {
                                                            props.onChange(e.target.checked)
                                                            setTimes((times) => {
                                                                times[index].isEnter = e.target.checked
                                                                return [...times]
                                                            })
                                                        }}
                                                    />}
                                                    label="Enter"
                                                />
                                            )}
                                        />

                                        <Tooltip title="Delete Time">
                                            <IconButton onClick={handleRemoveTime(index)} sx={{ height: "fit-content" }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>

                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", height: 10, alignItems: "center" }} >
                                        <Divider sx={{ flex: 1, height: 0, margin: 'auto', marginRight: '5px' }} />
                                        <Tooltip title="Add Time">
                                            <div style={{ width: "40px", height: "40px" }}>
                                                <IconButton onClick={handleAddTime(index + 1)} >
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        </Tooltip>
                                    </div>
                                </>
                            })}
                        </Stack>
                    </form>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions >
                <Button type="submit" form="timesForm" >Edit</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog >
    );
}

export default TimeModal
