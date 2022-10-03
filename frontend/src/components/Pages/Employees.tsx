import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useEffect, useState } from "react"
import { getEmployees } from "../../services/employees"
import { HeadCell } from "../../types/table"
import EmployeesTable from "../Table/Table"
import AddIcon from '@mui/icons-material/Add'

const columns: Array<HeadCell> = [
    {
        id: 'name',
        label: 'Name',
        numeric: false,
    },
    {
        id: 'cardId',
        label: 'card Id',
        numeric: false
    },
    {
        id: 'group',
        label: 'Group',
        numeric: false
    }
]


function Employees() {
    const [rows, setRows] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const { employees } = await getEmployees()
            const rows = employees.map((e: any) => ({
                name: e.name,
                cardId: e.cardId,
                group: e.group.name
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
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </div>
            <EmployeesTable
                rows={rows}
                columns={columns}
            />
        </>
    );
}

export default Employees
