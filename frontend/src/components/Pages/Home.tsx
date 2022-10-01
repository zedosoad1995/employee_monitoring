import { useEffect, useState } from "react";
import { getTimesheets } from "../../services/timesheet";
import { HeadCell } from "../../types/table";
import UsersTable from "../Table/Table"

const columns: Array<HeadCell> = [
    {
        id: 'name',
        label: 'Employee',
        numeric: false
    },
    {
        id: 'group',
        label: 'Group',
        numeric: false
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
        id: 'startTime',
        label: 'Start Time',
        numeric: false
    },
    {
        id: 'endTime',
        label: 'End Time',
        numeric: false
    },
    {
        id: 'hasNonAcceptableBreaks',
        label: '',
        numeric: false
    }
]


function Home() {
    const [rows, setRows] = useState(null)
    const [collapsedRows, setCollapsedRows] = useState(null)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getData = async () => {
            const { timesheets, total } = await getTimesheets()

            const rows = timesheets.map((ts: any) => ({
                name: ts.name,
                group: ts.group,
                overtime: ts.overtime,
                timeLate: ts.timeLate,
                startTime: ts.startTime,
                endTime: ts.endTime
            }))
            setRows(rows)

            const collapsedRows = timesheets.map((ts: any) => {
                return ts.breaks.map((b: any) => ({
                    startTime: b.startTime,
                    endTime: b.endTime,
                    duration: `${b.duration} (${b.minsExceeding > 0 ? '+' : ''}${b.minsExceeding})`,
                    isNotAcceptable: b.isNotAcceptable
                }))
            })
            setCollapsedRows(collapsedRows)

            setTotal(total)
        }

        getData()
    }, [])

    return (
        <UsersTable rows={rows} collapsedRows={collapsedRows} columns={columns} total={total} />
    );
}

export default Home
