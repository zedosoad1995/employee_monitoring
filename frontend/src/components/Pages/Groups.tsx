import { useEffect, useState } from "react"
import { getGroups } from "../../services/group"
import { HeadCell } from "../../types/table"
import GroupsTable from "../Table/Table"

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
            <GroupsTable
                rows={rows}
                columns={columns}
            />
        </>
    );
}

export default Groups
