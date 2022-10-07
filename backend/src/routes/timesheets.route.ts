import { Router } from 'express'
import { getMany, create, getManyRaw, editTimesFromEmployee } from '../controllers/timesheets.controller'


const router = Router()

router.get('/',
    getMany
)

router.get('/raw',
    getManyRaw
)

router.post('/',
    create
)

router.put('/editTimes/:employeeId',
    editTimesFromEmployee
)

export default router