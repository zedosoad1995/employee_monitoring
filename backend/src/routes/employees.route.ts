import { Router } from 'express'
import { getMany, create } from '../controllers/employees.controller'

const router = Router()

router.get('/',
    getMany
)

router.post('/',
    create
)

export default router