import axios from 'axios'

export const getEmployees = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/employees`)
        .then((res) => res.data)
}