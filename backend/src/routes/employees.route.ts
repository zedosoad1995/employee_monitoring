import { Router } from 'express'
import { getMany, create, getOne, update, deleteOne } from '../controllers/employees.controller'

const router = Router()

router.get('/',
    getMany
)

router.get('/:id',
    getOne
)

router.put('/:id',
    update
)

router.post('/',
    create
)

router.delete('/:id',
    deleteOne
)

export default router