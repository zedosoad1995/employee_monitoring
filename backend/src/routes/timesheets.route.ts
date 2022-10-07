import { Router } from 'express'
import { getMany, create, getManyRaw } from '../controllers/timesheets.controller'


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

export default router