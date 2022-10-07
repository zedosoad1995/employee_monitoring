export interface ICreateTimesheet {
    employeeId: string,
    date: string,
    time: string,
    isEnter: boolean
}

export interface ITimesheetObj {
    [key: string]: {
        times: Array<{ time: string, isEnter: boolean }>,
        employeeId: string,
        name: string,
        group: string
    }
}