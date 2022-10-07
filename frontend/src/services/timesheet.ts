import axios from 'axios'

export const getTimesheets = (query: any) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/timesheets`, { params: query })
        .then((res) => res.data)
}

export const getTimesheetRaw = (query: any) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/timesheets/raw`, { params: query })
        .then((res) => res.data)
}

export const editTimesFromEmployee = (employeeId: string, date: string, times: any) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/timesheets/editTimes/${employeeId}`, { date, times })
        .then((res) => res.data)
}