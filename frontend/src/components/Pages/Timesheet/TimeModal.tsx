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


function TimeModal({ times, handleClose, open, onSubmit, handleChangeTime, handleRemoveTime, handleAddTime, employee }:
    { times: Array<{ time: Date, isEnter: boolean }>, handleClose: any, open: any, onSubmit: any, handleChangeTime: any, handleRemoveTime: any, handleAddTime: any, employee: string }) {

    useEffect(() => {
        setValue('times', times)
    }, [JSON.stringify(times)])

    const { register, control, handleSubmit, formState: { errors }, setValue, getValues } =
        useForm<{ times: Array<{ time: Date, isEnter: boolean }> }>({
            resolver: yupResolver(schema),
            mode: 'onSubmit'
        })

    return (
        <Dialog fullWidth onClose={handleClose} open={open}>
            <div style={{ padding: '16px 24px' }}>
                <div style={{ fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.6, letterSpacing: '0.0075em' }}>
                    Edit Times: {employee}
                </div>
                <div style={{ color: "red", fontSize: 'small' }}>{errors.times?.message}</div>
            </div>
            <DialogContent sx={{ maxWidth: "600px", paddingTop: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form id="timesForm" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                <Button type="submit" form="timesForm" >Create</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog >
    );
}

export default TimeModal
