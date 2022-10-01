import axios from 'axios'

export const getTimesheets = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/timesheets`)
        .then((res) => res.data)
}