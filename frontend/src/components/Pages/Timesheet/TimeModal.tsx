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
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"


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
    )
})


function TimeModal({ times, handleClose, open, onSubmit, handleChangeTime, handleRemoveTime, handleAddTime, employee }:
    { times: Array<{ time: Date, isEnter: boolean }>, handleClose: any, open: any, onSubmit: any, handleChangeTime: any, handleRemoveTime: any, handleAddTime: any, employee: string }) {

    useEffect(() => {
    }, [])

    const { register, control, handleSubmit, formState: { errors }, setValue } =
        useForm<{ times: Array<{ time: Date, isEnter: boolean }> }>({
            resolver: yupResolver(schema),
            mode: 'onSubmit'
        })

    return (
        <Dialog fullWidth onClose={handleClose} open={open}>
            <DialogTitle>Edit Times: {employee}</DialogTitle>
            <DialogContent sx={{ maxWidth: "600px" }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form id="myForm" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack sx={{ mt: 1 }} spacing={2}>
                            <div style={{ display: "flex", justifyContent: "space-between" }} >
                                <Divider sx={{ flex: 1, height: 0, margin: 'auto' }} />
                                <Tooltip title="Add Time">
                                    <IconButton onClick={handleAddTime(0)} >
                                        <AddIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            {times.map((t, index) => {
                                return <>
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                        <Controller
                                            control={control}
                                            name={`times.${index}.time`}
                                            defaultValue={t.time}
                                            render={() => {
                                                return <TimePicker
                                                    label="Start Time"
                                                    value={t.time}
                                                    onChange={handleChangeTime(index, setValue)}
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
                                            <IconButton onClick={handleRemoveTime(index, setValue)} sx={{ height: "fit-content" }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>

                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                                        <Divider sx={{ flex: 1, height: 0, margin: 'auto' }} />
                                        <Tooltip title="Add Time">
                                            <IconButton onClick={handleAddTime(index + 1)}>
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </>
                            })}
                        </Stack>
                    </form>
                </LocalizationProvider>
            </DialogContent>
        </Dialog >
    );
}

export default TimeModal
