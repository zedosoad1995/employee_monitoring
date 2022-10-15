import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"

function FilterSelectList({ getData, id, label, editFilter, value, hasAutoComplete = false }: any) {
    const [rows, setRows] = useState<Array<any>>([])
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        const setData = async () => {
            const data = await getData()
            if (id in data) {
                setRows(data[id])
            } else {
                setRows(data)
            }
        }

        setData()
    }, [])

    useEffect(() => {
        handleChange(value)
    }, [value])

    const handleChange = (value: any) => {
        console.log(value)
        setSelectedValue(value)
        editFilter(value)
    }

    if (hasAutoComplete) {
        return <Autocomplete
            fullWidth
            disablePortal
            options={rows}
            onChange={(e, val) => { handleChange(val.id) }}
            renderInput={(params) => (<TextField {...params} label={label} />)}
            getOptionLabel={(option) => option.name ?? option}
        />
    }

    return <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
            label={label}
            value={selectedValue}
            onChange={(e: any) => { handleChange(e.target.value) }}
        >
            {rows.map((row) => (<MenuItem value={row.id}>{row.name}</MenuItem>))}
        </Select>
    </FormControl>
}

export default FilterSelectList