import { Router } from 'express'
import { getMany, create, getOne } from '../controllers/groups.controller'

const router = Router()

router.get('/',
    getMany
)

router.get('/:id',
    getOne
)

router.post('/',
    create
)

export default router