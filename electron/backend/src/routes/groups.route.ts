import { Router } from 'express'
import { getMany, create, getOne, update, deleteOne, getManyShort } from '../controllers/groups.controller'

const router = Router()

router.get('/',
    getMany
)

router.get('/short',
    getManyShort
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