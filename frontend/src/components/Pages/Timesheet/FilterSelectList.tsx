import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"

function FilterSelectList({ getData, id, label, editFilter, value }: any) {
    const [rows, setRows] = useState<Array<any>>([])
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        const setData = async () => {
            const data = await getData()
            setRows(data[id])
        }

        setData()
    }, [])

    useEffect(() => {
        handleChange(value)
    }, [value])

    const handleChange = (value: string) => {
        setSelectedValue(value)
        editFilter(value)
    };

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