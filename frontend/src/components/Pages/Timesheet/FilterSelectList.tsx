import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"

function FilterSelectList({ getData, id, label, editFilter }: any) {
    const [rows, setRows] = useState<Array<any>>([])
    const [selectedValue, setSelectedValue] = useState('')


    useEffect(() => {
        const setData = async () => {
            const data = await getData()
            setRows(data[id])
        }

        setData()
    }, [])

    const handleChange = (e: any) => {
        setSelectedValue(e.target.value)
        editFilter(e.target.value)
    };

    return <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
            label={label}
            value={selectedValue}
            onChange={handleChange}
        >
            {rows.map((row) => (<MenuItem value={row.id}>{row.name}</MenuItem>))}
        </Select>
    </FormControl>
}

export default FilterSelectList