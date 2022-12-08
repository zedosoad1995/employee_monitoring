import { Request, Response, NextFunction } from "express";
import * as WorkshiftService from "../services/workshift.service";
import httpStatusCodes from "http-status-codes";

export const updateMany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp;
  try {
    resp = await WorkshiftService.updateMany(
      req.body,
      req.query.employeeId as string,
      req.query.dateIni as string,
      req.query.dateFin as string
    );
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(httpStatusCodes.OK).json(resp);
};
