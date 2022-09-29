import { Request, Response, NextFunction } from 'express'
import * as groupsService from '../services/groups.service'
import httpStatusCodes from 'http-status-codes'

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await groupsService.getMany()
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.OK).json({ data: resp })
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await groupsService.create(req.body)
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.CREATED).json({ data: resp })
}