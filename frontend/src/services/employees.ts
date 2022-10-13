import axios from 'axios'

export const getEmployees = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/employees`)
        .then((res) => res.data)
}

export const createEmployee = (data: any) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/employees`, data)
}