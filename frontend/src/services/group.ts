import axios from 'axios'

export const getGroups = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/groups`)
        .then((res) => res.data)
}

export const getGroup = (groupId: string) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/groups/${groupId}`)
        .then((res) => res.data)
}

export const createGroup = (data: { name: string, startTime: string, endTime: string, breaks: Array<{ startTime: string, endTime: string }> }) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/groups`, data)
}