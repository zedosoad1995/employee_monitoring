import { Request, Response, NextFunction } from "express";
import * as SubgroupsService from "../services/subgroups.service";
import httpStatusCodes from "http-status-codes";

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let resp;
  try {
    resp = await SubgroupsService.update(req.params.id, req.body);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.status(httpStatusCodes.OK).json(resp);
};
