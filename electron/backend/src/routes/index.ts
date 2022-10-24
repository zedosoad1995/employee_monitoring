import { Router } from 'express'
import timesheetsRoute from './timesheets.route'
import employeesRoute from './employees.route'
import groupsRoute from './groups.route'


const api = Router()
    .use('/timesheets', timesheetsRoute)
    .use('/employees', employeesRoute)
    .use('/groups', groupsRoute)

export default Router().use('/api', api);