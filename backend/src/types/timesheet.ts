export interface ICreateTimesheet {
    employeeId: string,
    date: string,
    time: string,
    isEnter: boolean
}

export interface ITimesheetObj {
    [employeeId: string]: {
        [date: string]: {
            times: Array<{ id: string, time: string, isEnter: boolean }>,
            employeeId: string,
            name: string,
            group: any,
            date: string
        }
    }
}