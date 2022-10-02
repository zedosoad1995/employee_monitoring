import axios from 'axios'

export const getGroups = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/groups`)
        .then((res) => res.data)
}