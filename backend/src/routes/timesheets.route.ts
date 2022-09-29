import { Router } from 'express'
import { getMany, create } from '../controllers/timesheets.controller'


const router = Router()

router.get('/',
    getMany
)

router.post('/',
    create
)

export default router