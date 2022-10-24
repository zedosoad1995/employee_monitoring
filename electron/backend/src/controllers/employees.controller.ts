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

export const getManyShort = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await employeesService.getManyShort()
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.OK).json(resp)
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await employeesService.getOne(req.params.id)
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.OK).json(resp)
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await employeesService.update(req.params.id, req.body)
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

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await employeesService.deleteOne(req.params.id)
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.NO_CONTENT).json({})
}