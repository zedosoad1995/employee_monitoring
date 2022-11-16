import { Request, Response, NextFunction } from 'express'
import * as timesheetsService from '../services/timesheets.service'
import httpStatusCodes from 'http-status-codes'
import fs from 'fs'

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        const caca = fs.writeFileSync('C:/Users/joaop/Desktop/aaa.txt', 'utf8')
        resp = await timesheetsService.getMany(req.query)
    } catch (err) {
        fs.appendFileSync('C:/Users/joaop/Desktop/aaa.txt', JSON.stringify(err))
        return next(err)
    }

    res.status(httpStatusCodes.OK).json(resp)
}

export const getManyRaw = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await timesheetsService.getManyRaw(req.query)
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.OK).json(resp)
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
    let resp
    try {
        resp = await timesheetsService.create(req.body)
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.CREATED).json(resp)
}

export const editTimesFromEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const { date, times } = req.body

    try {
        await timesheetsService.editTimesFromEmployee(req.params.employeeId, date, times)
    } catch (err) {
        return next(err)
    }

    res.status(httpStatusCodes.NO_CONTENT).json()
}