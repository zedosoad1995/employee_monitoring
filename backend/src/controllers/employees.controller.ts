import { Request, Response, NextFunction } from 'express'
import * as employeesService from '../services/employees.service'
import httpStatusCodes from 'http-status-codes'

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await employeesService.getMany()
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.OK).json(resp)
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await employeesService.create(req.body)
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.CREATED).json(resp)
}